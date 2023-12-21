import { Schema } from "@/amplify/data/resource";
import { FormEvent, useEffect, useRef, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/router";
import {
  Stripe,
  StripeCardElement,
  StripeCardElementChangeEvent,
  StripeElements,
  loadStripe,
} from "@stripe/stripe-js";

const client = generateClient<Schema>();
export default function ProductPurchasePage() {
  const router = useRouter();
  let stripe = useRef<Stripe | null>(null);
  let elements = useRef<StripeElements>();
  let card = useRef<StripeCardElement>();
  let clientSecret = useRef<string>("");

  const [product, setProduct] = useState<Schema["Product"]>();
  const [profile, setProfile] = useState<Schema["Profile"]>();

  const stripeInit = async () => {
    stripe.current = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PK_KEY || "",
    );
    const { data } = await client.models.Product.get(
      {
        id: router.query.id as string,
      },
      { authMode: "iam" },
    );
    const response = await fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({ amount: data.priceInCents }),
    });
    const result = await response.json();

    clientSecret.current = result.client_secret as string;
    elements.current = stripe.current!.elements();
    const style = {
      base: { fontSize: "18px" },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#EE4B2B",
        iconColor: "#EE4B2B",
      },
    };
    card.current = elements.current!.create("card", {
      hidePostalCode: true,
      style: style,
    });

    card.current!.mount("#card-element");
    card.current!.on("change", function (event: StripeCardElementChangeEvent) {
      document.querySelector("button")!.disabled = (
        event as unknown as { empty: boolean }
      ).empty;
      document.querySelector("#card-error")!.textContent = event.error
        ? event.error.message
        : "";
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await client.models.Product.get(
        {
          id: router.query.id as string,
        },
        { authMode: "iam" },
      );
      setProduct(data);
    };
    const fetchProfile = async () => {
      const response = await fetch("/api/users/me");
      const jsonResponse = await response.json();
      const { profile } = jsonResponse;
      setProfile(profile);
    };
    fetchProfile();
    fetchProduct();
    setTimeout(() => stripeInit(), 200);
  }, []);

  const pay = async (event: FormEvent) => {
    event.preventDefault();

    let result = await stripe.current!.confirmCardPayment(
      clientSecret.current,
      {
        payment_method: { card: card.current! },
      },
    );

    if (result.error) {
      return showError(result.error.message!);
    }
    try {
      let response = await fetch("/api/orders/create", {
        method: "POST",
        body: JSON.stringify({
          stripeId: result.paymentIntent.id,
          profile,
          product,
        }),
      });

      if (response.status == 200) {
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showError = (errorMsgText: string) => {
    const errorMsg = document.querySelector("#card-error");
    console.error(errorMsgText, { autoClose: 3000 });
    errorMsg!.textContent = errorMsgText;
    setTimeout(() => {
      errorMsg!.textContent = "";
    }, 3000);
  };
  return (
    <>
      <span>
        <h1>
          Pay ${((product?.priceInCents ?? 0) / 100).toFixed(2)} for{" "}
          {product?.title}
        </h1>
        <span style={{ color: "red" }}>Test Mode:</span> Use card number{" "}
        <pre style={{ display: "inline" }}>4242 4242 4242 4242</pre> with
        expiration <pre style={{ display: "inline" }}>04/24</pre> and CVC{" "}
        <pre style={{ display: "inline" }}>242</pre>
      </span>
      <form onSubmit={pay}>
        <div id="card-element" />
        <p id="card-error" role="alert" />
        <button type="submit">
          <div>Confirm and pay</div>
        </button>
      </form>
    </>
  );
}

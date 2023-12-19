import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<
    Stripe.Response<Stripe.PaymentIntent> | { error: string }
  >,
) {
  const body = JSON.parse(request.body) as { amount: string };
  const stripeData = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const user = await getCurrentUser(contextSpec);
        if (!user) throw Error();
        const stripe = new Stripe(process.env.STRIPE_SK_KEY || "");

        const res = await stripe.paymentIntents.create({
          amount: Number(body.amount),
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });
        return res;
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: (error as Error).message });
        return { error: (error as Error).message };
      }
    },
  });
  response.status(200).json(stripeData);
  return { stripeData };
}

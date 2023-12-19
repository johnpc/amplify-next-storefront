import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from "aws-amplify/auth";
import Link from "next/link";

const client = generateClient<Schema>();

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Schema["Product"][]>([]);
  const [orders, setOrders] = useState<Schema["Order"][]>([]);
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput>();
  async function listProducts() {
    const { data } = await client.models.Product.list({
      // This authMode allows all Product records
      // to be returned, not only those that you own
      authMode: "apiKey",
    });
    setProducts(data ?? []);
  }
  async function listOrders() {
    const { data } = await client.models.Order.list();
    setOrders(data ?? []);
  }

  async function getUser() {
    const userAttributes = await fetchUserAttributes();
    setUserAttributes(userAttributes);
  }

  useEffect(() => {
    listProducts();
    listOrders();
    getUser();
    const sub = client.models.Product.observeQuery({
      authMode: "apiKey",
    }).subscribe(({ items }) => setProducts([...items]));

    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      <h1>Hello, {userAttributes?.email} 👋</h1>
      <button onClick={() => router.push("/profile")}>Edit Profile</button>
      <button onClick={() => router.push("/product/new")}>
        Create Product{" "}
      </button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              {product.title}: ${(product.priceInCents / 100).toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.id}</li>
        ))}
      </ul>
    </main>
  );
}

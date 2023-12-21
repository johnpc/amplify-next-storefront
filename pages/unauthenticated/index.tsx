import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { FetchUserAttributesOutput } from "aws-amplify/auth";

const client = generateClient<Schema>();

export default function HomePage() {
  const [products, setProducts] = useState<Schema["Product"][]>([]);
  useState<FetchUserAttributesOutput>();
  async function listProducts() {
    const response = await client.models.Product.list({
      // This authMode allows all Product records
      // to be returned, not only those that you own
      authMode: "iam",
    });
    setProducts(response.data ?? []);
  }

  useEffect(() => {
    listProducts();
  }, []);

  return (
    <main>
      <p>Found {products.length} products</p>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.title}: ${(product.priceInCents / 100).toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
}

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product-card";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Schema["Product"][]>([]);
  const [user, setUser] = useState<AuthUser>();
  useEffect(() => {
    async function setup() {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (e) {
        console.log("not logged in");
      }
      const response = await client.models.Product.list({
        authMode: "iam",
      });
      setProducts(response.data ?? []);
    }
    setup();
    const sub = client.models.Product.observeQuery({
      authMode: "iam",
    }).subscribe(({ items }) => setProducts([...items]));

    return () => sub.unsubscribe();
  }, []);

  return (
    <main>
      {user ? (
        <>
          <button onClick={() => router.push("/profile")}>Edit Profile</button>
          <button onClick={() => router.push("/product/new")}>
            Create Product{" "}
          </button>
        </>
      ) : (
        ""
      )}

      {products.map &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      <hr />
    </main>
  );
}

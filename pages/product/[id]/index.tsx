import { Schema } from "@/amplify/data/resource";
import { useRouter as useNavigationRouter } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import Image from "next/image";
const client = generateClient<Schema>();

export default function ProductDetailPage() {
  const router = useRouter();
  const navigationRouter = useNavigationRouter();
  const [product, setProduct] = useState<Schema["Product"]>();
  const [seller, setSeller] = useState<Schema["Profile"]>();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await client.models.Product.get(
        {
          id: router.query.id as string,
        },
        { authMode: "apiKey" }
      );
      setProduct(data);
      const sellerProfileResponse = await client.models.Profile.get(
        { id: data.owner! },
        { authMode: "apiKey" }
      );
      setSeller(sellerProfileResponse.data!);
    };
    fetchProduct();
  }, []);
  if (!product) {
    return <>Loading...</>;
  }

  return (
    <main>
      <h1>{product.title}</h1>
      <Image
        alt={product.title}
        src={product.imageUrl!}
        width={200}
        height={300}
      />
      <p>{product.description}</p>
      <p>${(product.priceInCents / 100).toFixed(2)}</p>
      <p>Sold by: {seller?.name}</p>
      <button onClick={() => navigationRouter.push("/")}>Home</button>
      <button
        onClick={() => navigationRouter.push(`/product/${product.id}/purchase`)}
      >
        Buy it now!
      </button>
    </main>
  );
}

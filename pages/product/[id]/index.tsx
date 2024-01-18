import { Schema } from "@/amplify/data/resource";
import { useRouter as useNavigationRouter } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { getUrl } from "aws-amplify/storage";
import { Image } from "@aws-amplify/ui-react";
const client = generateClient<Schema>({ authMode: "iam" });

export default function ProductDetailPage() {
  const router = useRouter();
  const navigationRouter = useNavigationRouter();
  const [product, setProduct] = useState<Schema["Product"]>();
  const [imageKey, setimageKey] = useState<string>();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await client.models.Product.get({
        id: router.query.id as string,
      });
      setProduct(data);
      const url = await getUrl({
        key: data.imageKey!,
      });
      setimageKey(url.url.href);
    };

    fetchProduct();
  }, []);
  if (!product) {
    return <>Loading...</>;
  }

  return (
    <main>
      <h1>{product.title}</h1>
      {imageKey ? (
        <Image alt={product.title} src={imageKey} width={200} height={300} />
      ) : (
        ""
      )}
      <p>{product.description}</p>
      <p>${(product.priceInCents / 100).toFixed(2)}</p>
      <button onClick={() => navigationRouter.push("/")}>Home</button>
      <button
        onClick={() => navigationRouter.push(`/product/${product.id}/purchase`)}
      >
        Buy it now!
      </button>
    </main>
  );
}

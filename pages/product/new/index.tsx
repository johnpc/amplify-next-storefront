import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import ProductCreateForm from "@/ui-components/ProductCreateForm";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/utils/uploadImage";

export default function NewProductPage() {
  const [imageKey, setImageKey] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [profile, setProfile] = useState<Schema["Profile"]>();
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/users/me");
      const jsonResponse = await response.json();
      const { profile } = jsonResponse;
      setProfile(profile);
    };
    fetchProfile();
  }, []);
  const router = useRouter();
  if (!profile) {
    return <>Loading...</>;
  }

  const uploadProductImage = async (event: FormEvent) => {
    const { key, href } = await uploadImage(event);
    setImageUrl(href);
    setImageKey(key);
  };
  return (
    <main>
      <Image
        alt={profile.name!}
        width={200}
        height={200}
        src={imageUrl || "https://picsum.photos/200/300?random=1"}
      />
      <hr />
      <input type="file" onChange={uploadProductImage} />
      <ProductCreateForm
        overrides={{
          owner: {
            disabled: true,
            value: profile?.id,
            isRequired: true,
            isReadOnly: true,
          },
          imageUrl: {
            disabled: true,
            value: imageKey,
          },
        }}
        onSubmit={(fields) => ({
          ...fields,
          owner: profile.id,
          profileProductsId: profile.id,
          imageUrl: imageKey,
        })}
      />
      <button onClick={() => router.push("/")}>Home</button>
    </main>
  );
}

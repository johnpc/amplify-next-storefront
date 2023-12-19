import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import ProductCreateForm from "@/ui-components/ProductCreateForm";
import { FormEvent, useEffect, useState } from "react";
import { getUrl, uploadData } from "aws-amplify/storage";
import Image from "next/image";

export default function NewProductPage() {
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

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  }

  const uploadImage = async (event: FormEvent) => {
    const filename = `${uuidv4()}-image`;
    const file = await (
      event.target as HTMLInputElement
    ).files![0].arrayBuffer();

    try {
      const result = await uploadData({
        key: filename,
        data: file,

        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${
                  Math.round(transferredBytes / totalBytes) * 100
                } %`,
              );
            }
          },
        },
      }).result;
      console.log("Key from Response: ", result.key);

      const url = await getUrl({
        key: result.key,
      });
      setImageUrl(url.url.href);
    } catch (error) {
      console.log("Error : ", error);
    }
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
      <input type="file" onChange={uploadImage} />
      <h1>Hello!</h1>
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
            value: imageUrl,
          },
        }}
        onSubmit={(fields) => ({
          ...fields,
          owner: profile.id,
          profileProductsId: profile.id,
          imageUrl,
        })}
      />
      <button onClick={() => router.push("/")}>Home</button>
    </main>
  );
}

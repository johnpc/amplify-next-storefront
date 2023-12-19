import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import ProductCreateForm from "@/ui-components/ProductCreateForm";
import { useEffect, useState } from "react";

export default function NewProductPage() {
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
  return (
    <main>
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
            required: true,
          },
        }}
        onSubmit={(fields) => ({
          ...fields,
          owner: profile.id,
          profileProductsId: profile.id,
        })}
      />
      <button onClick={() => router.push("/")}>Home</button>
    </main>
  );
}

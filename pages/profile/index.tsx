import { Schema } from "@/amplify/data/resource";
import ProfileUpdateForm from "@/ui-components/ProfileUpdateForm";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Schema["Profile"]>();
  const router = useRouter();

  const logOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/users/me");
      const jsonResponse = await response.json();
      const { profile } = jsonResponse;
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <>Loading...</>;
  }

  return (
    <>
      <Image
        alt={profile.name!}
        width={200}
        height={200}
        src={profile.avatarUrl!}
      />
      <ProfileUpdateForm
        profile={profile}
        overrides={{
          userId: {
            disabled: true,
          },
          owner: {
            disabled: true,
          },
          balanceInCents: {
            disabled: true,
          },
          email: {
            disabled: true,
          },
        }}
      />
      <button onClick={() => logOut()}>Sign out</button>
      <button onClick={() => router.push("/")}>Home</button>
    </>
  );
}

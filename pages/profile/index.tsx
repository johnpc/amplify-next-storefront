import { Schema } from "@/amplify/data/resource";
import ProfileUpdateForm from "@/ui-components/ProfileUpdateForm";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { getUrl, uploadData } from "aws-amplify/storage";

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [avatarKey, setAvatarKey] = useState<string>();
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
      if (profile.avatarUrl.startsWith("http")) {
        setAvatarUrl(profile.avatarUrl);
      } else {
        setAvatarKey(profile.avatarUrl);
        const url = await getUrl({
          key: profile.avatarUrl,
        });
        setAvatarUrl(url.url.href);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <>Loading...</>;
  }

  const uploadImage = async (event: FormEvent) => {
    const filename = `${profile.id}-avatar`;
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
      const url = await getUrl({
        key: result.key,
      });
      setAvatarUrl(url.url.href);
      setAvatarKey(result.key);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <>
      <Image alt={profile.name!} width={200} height={200} src={avatarUrl!} />
      <hr />
      <input type="file" onChange={uploadImage} />
      <ProfileUpdateForm
        profile={profile}
        onSubmit={(fields) => ({
          ...fields,
          avatarUrl: avatarKey,
        })}
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
          avatarUrl: {
            disabled: true,
            value: avatarKey,
          },
        }}
      />
      <button onClick={() => logOut()}>Sign out</button>
      <button onClick={() => router.push("/")}>Home</button>
    </>
  );
}

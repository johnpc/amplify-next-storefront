import { Schema } from "@/amplify/data/resource";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import config from "@/amplifyconfiguration.json";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth/server";
import { AmplifyServer } from "aws-amplify/adapter-core";

export const getOrCreateProfile = async (
  contextSpec: AmplifyServer.ContextSpec
): Promise<Schema["Profile"]> => {
  const session = await fetchAuthSession(contextSpec);
  const user = await getCurrentUser(contextSpec);
  const userAttributes = await fetchUserAttributes(contextSpec);
  const client = generateServerClientUsingReqRes<Schema>({
    config: config,
    authMode: "userPool",
    authToken: session.tokens?.accessToken.toString()!,
  });

  let existingProfile;
  try {
    existingProfile = await client.models.Profile.get(contextSpec, {
      id: user.userId,
    });
  } catch (e) {
    console.log(e);
  }

  if (existingProfile?.data?.id) {
    return existingProfile.data;
  }
  console.log("creating new profile record");
  const createdProfile = await client.models.Profile.create(contextSpec, {
    id: user.userId,
    userId: user.userId,
    email: userAttributes.email!,
    avatarUrl:
      "https://fdocizdzprkfeigbnlxy.supabase.co/storage/v1/object/public/arbor-eats-app-files/missing-avatar.png",
    balanceInCents: 0,
    name: userAttributes.name ?? userAttributes.email ?? user.username,
    address: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
    owner: user.userId,
  });

  return createdProfile.data;
};

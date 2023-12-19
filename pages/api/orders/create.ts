import { NextApiRequest, NextApiResponse } from "next";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { Schema } from "@/amplify/data/resource";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import config from "@/amplifyconfiguration.json";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Schema["Order"] | { error: string }>
) {
  const { stripeId, profile, product } = JSON.parse(request.body) as {
    stripeId: string;
    profile: Schema["Profile"];
    product: Schema["Product"];
  };
  const stripeData = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        const user = await getCurrentUser(contextSpec);
        if (!user) throw Error();
        const client = generateServerClientUsingReqRes<Schema>({
          config: config,
          authMode: "userPool",
          authToken: session.tokens?.accessToken.toString()!,
        });

        const sellerProfileResponse = await client.models.Profile.get(
          contextSpec,
          { id: product.owner! },
          { authMode: "apiKey" }
        );
        const seller = sellerProfileResponse.data!;

        const createdOrder = await client.models.Order.create(contextSpec, {
          stripeId,
          owner: [profile.id, product.owner!],
          orderSellerProfileId: product.owner,
          orderBuyerProfileId: profile.id,
        });

        await client.models.Profile.update(
          contextSpec,
          {
            id: seller.id,
            balanceInCents: seller.balanceInCents + product.priceInCents,
          },
          { authMode: "apiKey" }
        );

        return createdOrder.data;
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: (error as Error).message });
        return { error: (error as Error).message };
      }
    },
  });
  response.status(200).json(stripeData);
  return { stripeData };
}

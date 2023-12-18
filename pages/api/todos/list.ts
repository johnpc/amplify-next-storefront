import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import config from "@/amplifyconfiguration.json";

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse<any>
) {
  const data = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      const session = await fetchAuthSession(contextSpec);
      try {
        const client = generateServerClientUsingReqRes({
          config: config,
          authMode: "userPool",
          authToken: session.tokens?.accessToken.toString()!,
        }) as any;
        const { data } = await client.models.Todo.list(contextSpec);
        return { data };
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: (error as Error).message });
        return { error: (error as Error).message };
      }
    },
  });

  response.status(200).json(data);
  return { data };
}

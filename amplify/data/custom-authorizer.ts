import type { AppSyncAuthorizerHandler } from "aws-lambda"; // types imported from @types/aws-lambda

type ResolverContext = {
  userid: string;
  info: string;
  more_info: string;
};

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (
  event,
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { authorizationToken } = event;
  const response = {
    isAuthorized: authorizationToken === "custom-authorized",
    resolverContext: {
      userid: "user-id",
      info: "contextual information A",
      more_info: "contextual information B",
    },
    deniedFields: [],
    ttlOverride: 300,
  };
  console.log(`RESPONSE: ${JSON.stringify(response, null, 2)}`);
  return response;
};

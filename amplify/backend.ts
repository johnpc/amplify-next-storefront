// amplify/backend.ts
import * as s3 from "aws-cdk-lib/aws-s3";
import { defineBackend, defineFunction } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { storage } from "./storage/resource.js";
import { Function } from "aws-cdk-lib/aws-lambda";

const authFunction = defineFunction({
  entry: "./data/custom-authorizer.ts",
});
const backend = defineBackend({
  authFunction,
  auth,
  data: data(authFunction),
  storage,
});

const underlyingAuthLambda = backend.authFunction.resources.lambda as Function;
underlyingAuthLambda.addEnvironment(
  "ADMIN_API_KEY",
  process.env.ADMIN_API_KEY!,
);

const bucket = backend.storage.resources.bucket as s3.Bucket;
// allow any authenticated user to read and write to the bucket
const authRole = backend.auth.resources.authenticatedUserIamRole;
bucket.grantReadWrite(authRole);

// allow any guest (unauthenticated) user to read from the bucket
const unauthRole = backend.auth.resources.unauthenticatedUserIamRole;
bucket.grantReadWrite(unauthRole);

bucket.addCorsRule({
  allowedHeaders: ["*"],
  allowedMethods: [
    s3.HttpMethods.GET,
    s3.HttpMethods.HEAD,
    s3.HttpMethods.PUT,
    s3.HttpMethods.POST,
    s3.HttpMethods.DELETE,
  ],
  allowedOrigins: ["*"],
  exposedHeaders: [
    "x-amz-server-side-encryption",
    "x-amz-request-id",
    "x-amz-id-2",
    "ETag",
  ],
  maxAge: 3000,
});

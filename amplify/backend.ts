// amplify/backend.ts
import * as s3 from "aws-cdk-lib/aws-s3";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";

const backend = defineBackend({
  auth,
  data,
});

/**
 * THIS HACK IS NEEDED UNTIL THIS PR IS RELEASED: https://github.com/aws-amplify/amplify-backend/pull/808
 */

// create the bucket and its stack
const bucketStack = backend.createStack("BucketStack");
const bucket = new s3.Bucket(bucketStack, "Bucket", {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
});

// allow any authenticated user to read and write to the bucket
const authRole = backend.resources.auth.resources.authenticatedUserIamRole;
bucket.grantReadWrite(authRole);

// allow any guest (unauthenticated) user to read from the bucket
const unauthRole = backend.resources.auth.resources.unauthenticatedUserIamRole;
bucket.grantRead(unauthRole);

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

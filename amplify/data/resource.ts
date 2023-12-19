// amplify/data/resource.ts
import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource, can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      done: a.boolean(),
      priority: a.enum(["low", "medium", "high"]),
    })
    .authorization([a.allow.owner(), a.allow.public().to(["read"])]),
  Profile: a
    .model({
      id: a.id().required(),
      userId: a.string().required(),
      email: a.string().required(),
      avatarUrl: a.string(),
      balanceInCents: a.integer().required(),
      name: a.string(),
      address: a.string().required(),
      zipcode: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      owner: a.string().required(),
      country: a.string().required(),
      products: a.hasMany("Product"),
    })
    .authorization([
      a.allow.owner(),
      a.allow.custom(),
      a.allow.public().to(["read"]),
    ]),
  Product: a
    .model({
      id: a.id().required(),
      seller: a.belongsTo("Profile"),
      title: a.string().required(),
      description: a.string().required(),
      priceInCents: a.integer().required(),
      imageUrl: a.string(),
    })
    .authorization([a.allow.owner(), a.allow.public().to(["read"])]),
  Order: a
    .model({
      id: a.id().required(),
      buyerProfile: a.hasOne("Profile"),
      sellerProfile: a.hasOne("Profile"),
      stripeId: a.string().required(),
    })
    .authorization([a.allow.multipleOwners(), a.allow.public().to(["read"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    lambdaAuthorizationMode: {
      function: defineFunction({
        entry: "./custom-authorizer.ts",
      }),
      // (Optional) STEP 3
      // Configure the token's time to live
      timeToLiveInSeconds: 300,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions, or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

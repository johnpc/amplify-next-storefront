// amplify/data/resource.ts
import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

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
      timeToLiveInSeconds: 300,
    },
  },
});

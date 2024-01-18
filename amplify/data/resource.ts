// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Profile: a
    .model({
      id: a.id().required(),
      userId: a.string().required(),
      email: a.string().required(),
      avatarUrl: a.string(),
      balanceInCents: a
        .integer()
        .authorization([a.allow.custom(), a.allow.owner().to(["read"])])
        .default(0),
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
      a.allow.private().to(["read"]),
      a.allow.private("iam").to(["read"]),
      a.allow.public("iam").to(["read"]),
    ]),
  Product: a
    .model({
      seller: a.belongsTo("Profile"),
      title: a.string().required(),
      description: a.string().required(),
      priceInCents: a.integer().required(),
      imageKey: a.string(),
    })
    .authorization([
      a.allow.owner(),
      a.allow.private().to(["read"]),
      a.allow.public("iam").to(["read"]),
      a.allow.private("iam").to(["read"]),
    ]),
  Order: a
    .model({
      buyerProfile: a.hasOne("Profile"),
      sellerProfile: a.hasOne("Profile"),
      stripeId: a.string().required(),
    })
    .authorization([
      a.allow.multipleOwners(),
      a.allow.private("iam").to(["read"]),
      a.allow.public("iam").to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = (authFunction: any) =>
  defineData({
    schema,
    authorizationModes: {
      defaultAuthorizationMode: "iam",
      allowListedRoleNames: [],
      lambdaAuthorizationMode: {
        function: authFunction,
        timeToLiveInSeconds: 300,
      },
    },
  });

import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";
import dotenv from "dotenv";
import { uploadImageBuffer } from "@/utils/uploadImage";
import { getCurrentUser, signIn } from "aws-amplify/auth";
dotenv.config();
Amplify.configure(config);

const client = generateClient<Schema>({
  authMode: "userPool",
});

const products = [
  {
    title: "Book",
    description: "The best book in the biz",
    priceInCents: 1000,
    image: "http://localhost:3000/book.jpg",
  },
  {
    title: "Headphones",
    description: "Perfect audio quality",
    priceInCents: 7500,
    image: "http://localhost:3000/headphones.jpg",
  },
  {
    title: "Bottle",
    description:
      "A water bottle, but you can use it to bottle other things too",
    priceInCents: 200,
    image: "http://localhost:3000/bottle.jpg",
  },
];
const getImageFromUrl = async (url: string) => {
  const imageResponse = await fetch(url);
  const imageBuffer = await imageResponse.arrayBuffer();
  const uploadResponse = await uploadImageBuffer(imageBuffer);
  console.log({ uploadResponse });
  return uploadResponse.key;
};

const seed = async () => {
  await signIn({
    username: process.env.SEED_USERNAME!,
    password: process.env.SEED_PASSWORD,
  });
  const user = await getCurrentUser();
  await client.models.Profile.create(
    {
      id: user.userId,
      userId: user.userId,
      email: user.signInDetails?.loginId as string,
      avatarUrl:
        "https://fdocizdzprkfeigbnlxy.supabase.co/storage/v1/object/public/arbor-eats-app-files/missing-avatar.png",
      name: user.username,
      address: "",
      zipcode: "",
      city: "",
      state: "",
      country: "",
      owner: user.userId,
    },
    { authMode: "lambda", authToken: process.env.ADMIN_API_KEY },
  );

  const existingProducts = await client.models.Product.list();
  const deletePromises = existingProducts.data.map((product) =>
    client.models.Product.delete({ id: product.id }),
  );
  await Promise.all(deletePromises);

  const promises = products.map(async (product) => {
    const productWithImage = {
      ...product,
      image: undefined,
      profileProductsId: user.userId,
      imageKey: await getImageFromUrl(product.image),
    };
    const response = await client.models.Product.create(productWithImage);
    console.log({
      ...response,
      created: !response.errors,
    });
  });
  await Promise.all(promises);
};
seed();

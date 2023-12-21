# Amplify Amazon Clone Demo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`npm create amplify`]. It is intended to be instructional on how to use Amplify Gen2 with NextJS. It implements an online store where users can post new products for sale or purchase existing products.

## Features

- Learn about using the Amplify Data category, including:
  - **relationships:** A seller's "Profile" has many "Products" for example
  - **permissions:** An "Order" belongs to both a "Buyer" and a "Seller". "Profile" editing is private to the logged in user, but publicly readable. Updating a seller's "balance" after a sale uses custom/admin permissions)
- Learn about using the Amplify Storage category, including:
  - Uploading to an S3 bucket for User Profile Avatars and Product images
  - Downloading from S3 bucket using public presigned urls
- Learn about using the Amplify Auth category, including:
  - Sign up with confirmation email
  - Sign in with permissions to see only resources allowed by data category settings
- Learn about Amplify UI Builder codegen
  - Automatically generate form React component to Create product
  - Automatically generate form React component to Edit profile, with overrides for non-editable fields
- Learn about NextJS integration, including
  - Hosting publicly via Amplify Hosting, with CI/CD deployment on `git push`
  - NextJS pages and api routes gated by authentication/authorization from Amplify Auth category settings
  - Api routes including integrations with 3rd party services, in this case Stripe API for payments
  - Environment variables and secrets (such as Stripe API key)

## Getting Started

In two terminal tabs:

1. run the development server:

```bash
npm run dev
```

2. run the Amplify sandbox to provision resources

```bash
npx amplify sandbox
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/users/me](http://localhost:3000/api/users/me). This endpoint can be edited in `pages/api/users/me.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

To modify your backend resources, update `amplify/backend.ts`. The `sandbox` watcher script will keep your backend up to date as you develop.

## Environment Variables

Set up your .env file via:

```bash
cp .env.example .env
```

Then add your Stripe API keys to the .env file. For production (https://dashboard.stripe.com/apikeys) or test mode (https://dashboard.stripe.com/test/apikeys).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Amplify Hosting

Deploy to Amplify Hosting with one click.

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/johnpc/amplizon)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_STRIPE_PK_KEY: process.env.NEXT_PUBLIC_STRIPE_PK_KEY,
    STRIPE_SK_KEY: process.env.STRIPE_SK_KEY,
    IS_DEVELOPMENT: process.env.IS_DEVELOPMENT,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/200/300",
      },
      {
        protocol: "https",
        hostname: "fdocizdzprkfeigbnlxy.supabase.co",
        port: "",
        pathname:
          "/storage/v1/object/public/arbor-eats-app-files/missing-avatar.png",
      },
      {
        protocol: "https",
        hostname:
          "amplify-nextamplifygen2-xss-sandbox-bucket83908e77-rhqm4ujul7rl.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/public/*",
      },
      {
        protocol: "https",
        hostname:
          "amplify-d2lgoq62e7b8fm-main-branch--bucket83908e77-zvho4kifp9xe.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/public/*",
      },
    ],
  },
};

module.exports = nextConfig;

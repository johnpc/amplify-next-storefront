/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ],
  },
};

module.exports = nextConfig;

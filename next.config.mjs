/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/Shakawat-Sadik/PH-Assignment_07-Keen_Keeper_assets/main/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        pathname: "**"
      }
    ],
  },
};

export default nextConfig;

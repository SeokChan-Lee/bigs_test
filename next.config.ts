import { NextConfig } from "next";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

function getHostname(url: string) {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return "";
  }
}

const hostname = getHostname(NEXT_PUBLIC_BASE_URL);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: hostname ? [hostname] : [],
  },
};

export default nextConfig;

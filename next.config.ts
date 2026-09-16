import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["192.168.18.16"],
	basePath,
	images: isStaticExport ? { unoptimized: true } : undefined,
	output: isStaticExport ? "export" : undefined,
	reactStrictMode: true,
	trailingSlash: isStaticExport,
};

export default nextConfig;

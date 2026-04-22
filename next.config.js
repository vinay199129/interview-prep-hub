/** @type {import('next').NextConfig} */
// For GitHub Pages: static export under a project subpath.
// The Actions workflow sets NEXT_PUBLIC_BASE_PATH (e.g. "/interview-prep-hub").
// For local `next dev` / `next build` it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};
module.exports = nextConfig;

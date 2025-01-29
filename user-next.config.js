/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    return config
  },
  transpilePackages: ["@privy-io/react-auth", "@privy-io/core"],
  // Add this section to handle client-side exceptions
  onError: (error, errorInfo) => {
    console.error("NextJS Error:", error, errorInfo)
  },
}

module.exports = nextConfig


import type { NextConfig } from "next"
//import type { Configuration } from "webpack"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    ...getImageDomains(),
  },
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = config.resolve || {}
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

function getImageDomains() {
  return {
    domains: ["ucarecdn.com", "cryptologos.cc"],
  }
}

export default nextConfig

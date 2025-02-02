import type { Metadata } from "next"

interface SharedMetadataProps {
  title: string
  description: string
  keywords?: string[]
}

export function sharedMetadata({ title, description, keywords = [] }: SharedMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://barkprotocol.net";

  return {
    title: `${title} | BARK AI Agent`,
    description,
    keywords: [...keywords, "BARK AI Agent", "Solana", "trading", "DeFi", "artificial intelligence"],
    openGraph: {
      title,
      description,
      type: "website",
      url: baseUrl,
      siteName: "BARK AI Agent",
    },
    twitter: {
      card: "summary_large_image",
      site: "@bark_protocol",
      creator: "@bark_protocol",
    },
  }
}

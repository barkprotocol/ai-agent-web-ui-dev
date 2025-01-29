import type { Metadata } from "next"
import { Hero } from "@/components/ui/layout/hero"
import { Features } from "@/components/ui/layout/features"
import HowItWorks from "@/components/ui/layout/how-it-works"
import { CTA } from "@/components/ui/layout/cta"
import { FAQ } from "@/components/ui/layout/faq"
import { sharedMetadata } from "@/components/shared-metadata"

export const metadata: Metadata = sharedMetadata({
  title: "Home",
  description: "BARK AI Agent - Your intelligent copilot for Solana blockchain interactions and DeFi trading.",
  keywords: ["AI trading", "Solana DeFi", "Blockchain AI"],
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
    </>
  )
}


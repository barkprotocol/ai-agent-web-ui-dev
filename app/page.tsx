import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import HowItWorks from "@/components/home/how-it-works"
import CTA from "@/components/home/cta"
import FAQ from "@/components/home/faq"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
    </div>
  )
}


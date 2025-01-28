"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, BarChart, Zap, Shield, Coins, Users } from "lucide-react"

interface Section {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  imageUrl: string
}

const sections: Section[] = [
  {
    title: "AI-Powered Trading",
    description:
      "Leverage advanced AI algorithms for smart, automated trading strategies tailored to your preferences and risk tolerance.",
    icon: Bot,
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Real-Time Market Analysis",
    description:
      "Access instant insights with our real-time market analysis tools, helping you make informed decisions in the fast-paced crypto market.",
    icon: BarChart,
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Lightning-Fast Transactions",
    description:
      "Execute trades with unprecedented speed using our optimized transaction processing system built on Solana.",
    icon: Zap,
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Enhanced Security",
    description:
      "Benefit from state-of-the-art security measures, including multi-factor authentication and cold storage options for your assets.",
    icon: Shield,
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "DeFi Integration",
    description:
      "Seamlessly interact with various DeFi protocols to maximize your yield and explore new financial opportunities.",
    icon: Coins,
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Community Insights",
    description:
      "Gain valuable insights from our community of traders and analysts, and participate in collaborative decision-making.",
    icon: Users,
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export default function HowItWorks() {
  const [activeSection, setActiveSection] = useState<number>(0)
  const [imageLoading, setImageLoading] = useState(true)

  const handleSectionClick = useCallback((index: number) => {
    setActiveSection(index)
    setImageLoading(true)
  }, [])

  return (
    <section className="py-16 bg-background" aria-labelledby="how-it-works-title">
      <div className="container mx-auto px-4">
        <h2 id="how-it-works-title" className="text-3xl font-bold mb-4 text-center text-primary">
          How BARK AI Agent Works
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Discover how BARK AI Agent revolutionizes your trading experience with cutting-edge AI and blockchain
          technology.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 order-2 lg:order-1">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={false}
                animate={{
                  backgroundColor: activeSection === index ? "hsl(var(--primary))" : "transparent",
                  color: activeSection === index ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                }}
                className={cn(
                  "w-full text-left transition-all duration-200 p-4 rounded-lg",
                  "hover:bg-primary/10",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                )}
              >
                <button
                  onClick={() => handleSectionClick(index)}
                  className="w-full text-left"
                  aria-pressed={activeSection === index}
                >
                  <div className="flex items-center space-x-4">
                    <section.icon
                      className={cn("w-6 h-6", activeSection === index ? "text-primary-foreground" : "text-[#DBCFC7]")}
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{sections[activeSection].title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{sections[activeSection].description}</p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={sections[activeSection].imageUrl || "/placeholder.svg"}
                    alt={`Illustration for ${sections[activeSection].title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cn(
                      "object-contain transition-opacity duration-300",
                      imageLoading ? "opacity-0" : "opacity-100",
                    )}
                    priority
                    onLoad={() => setImageLoading(false)}
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true">
                      <span className="sr-only">Loading image...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}


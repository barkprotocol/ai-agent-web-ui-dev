"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const exchangeLinks = [
  {
    href: "https://www.orca.so/",
    src: "https://ucarecdn.com/20144fb1-9521-4813-b025-0dd8ab0689d5/orcaorcalogo.svg",
    alt: "Orca Logo",
  },
  {
    href: "https://raydium.io/",
    src: "https://ucarecdn.com/cd39f835-9d08-4d65-96e6-55d0c98bc86a/ray2x.png",
    alt: "Raydium Logo",
  },
  {
    href: "https://jup.ag/",
    src: "https://ucarecdn.com/80fffad0-0b23-4004-b942-a7ac8b20462d/jupiteragjuplogo.svg",
    alt: "Jupiter Logo",
  },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden py-16 px-4">
            <Image
              src="https://ucarecdn.com/f6029e68-9768-49db-80a9-64e41e70acff/waveblack.png"
              alt="Abstract wave background"
              fill
              sizes="100vw"
              quality={90}
              priority
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
              aria-hidden="true"
            />
            <div className="relative z-10 container mx-auto text-center text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground leading-tight drop-shadow-lg">
                  Your Intelligent Copilot for Solana
                </h1>
                <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 drop-shadow-md">
                  Elevate your DeFi experience with BARK AI Agent. Harness the power of artificial intelligence to
                  optimize your Solana investments and navigate decentralized finance with ease.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12">
                  <Button
                    asChild
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white shadow-lg transition-all text-lg px-8 py-4 relative overflow-hidden group"
                  >
                    <Link href="/dashboard">
                      <span className="relative z-10">Launch Dashboard</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-gray-300 text-white hover:bg-gray-800 hover:border-gray-400 transition-all shadow-md text-lg px-8 py-4 relative overflow-hidden group"
                  >
                    <Link href="/whitepaper">
                      <span className="relative z-10">Whitepaper</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </div>
                <div className="mt-12">
                  <p className="text-sm mb-4 text-primary-foreground/80">Trade BARK on leading exchanges</p>
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    {exchangeLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-80"
                      >
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt}
                          width={100}
                          height={40}
                          className="h-8 w-auto object-contain filter drop-shadow-md"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="https://solscan.io/token/2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors"
                  >
                    CA: 2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


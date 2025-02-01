"use client"

import type React from "react"
import { forwardRef, useRef } from "react"
import Image from "next/image"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"

interface Integration {
  name: string
  icon: string
  description: string
}

const integrations: Integration[] = [
  {
    name: "DexScreener",
    icon: "integrations/dexscreener.svg",
    description: "Real-time DEX trading data and analytics",
  },
  {
    name: "Dialect",
    icon: "integrations/dialect.svg",
    description: "Web3 messaging and notifications",
  },
  {
    name: "Jupiter",
    icon: "integrations/jupiter.svg",
    description: "Best-in-class Solana DEX aggregator",
  },
  {
    name: "Magic Eden",
    icon: "integrations/magic_eden.svg",
    description: "Leading NFT marketplace on Solana",
  },
  {
    name: "Pump.fun",
    icon: "integrations/pump_fun.svg",
    description: "Fair-launch token platform",
  },
  {
    name: "Metaplex",
    icon: "integrations/metaplex.svg",
    description: "NFT standard and tooling",
  },
  {
    name: "Helius",
    icon: "integrations/helius.svg",
    description: "Enterprise-grade RPC and APIs",
  },
]

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    integration: Integration
  }
>(({ className, children, integration }, ref) => {
  return (
    <div className="group relative">
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex size-14 items-center justify-center rounded-full",
          "border-2 border-[#dbcfc7]/20 bg-white/95 p-3",
          "shadow-[0_0_15px_-3px_rgba(219,207,199,0.3)]",
          "transition-all duration-300 ease-in-out",
          "hover:border-[#dbcfc7]/40 hover:shadow-[0_0_20px_-3px_rgba(219,207,199,0.5)]",
          className,
        )}
      >
        {children}
      </div>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="relative rounded bg-black/90 px-3 py-2 text-center text-xs text-white">
          <div className="font-medium">{integration.name}</div>
          <div className="text-[10px] text-gray-400">{integration.description}</div>
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/90"></div>
        </div>
      </div>
    </div>
  )
})

Circle.displayName = "Circle"

export function IntegrationCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-50 p-10 dark:from-gray-900 dark:to-black"
      ref={containerRef}
    >
      {/* Center BARK Logo */}
      <div ref={centerRef} className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex size-20 items-center justify-center rounded-full border-2 border-[#dbcfc7]/30 bg-white/95 p-4 shadow-[0_0_30px_-6px_rgba(219,207,199,0.5)]">
          <Image
            src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
            alt="BARK"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Integration Circles */}
      <div className="relative size-full">
        {integrations.map((integration, index) => {
          const angle = (index * (2 * Math.PI)) / integrations.length
          const radius = 160 // Adjust this value to change the circle size
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={integration.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <Circle ref={(el) => (circleRefs.current[index] = el)} integration={integration}>
                <Image
                  src={integration.icon || "/placeholder.svg"}
                  alt={integration.name}
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                />
              </Circle>
            </div>
          )
        })}
      </div>

      {/* Animated Beams */}
      {circleRefs.current.map((ref, index) => {
        if (!ref) return null
        return (
          <AnimatedBeam
            key={index}
            containerRef={containerRef}
            fromRef={{ current: ref }}
            toRef={centerRef}
            curvature={15}
            reverse={index % 2 === 0}
          />
        )
      })}
    </div>
  )
}


import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About BARK AI Agent",
  description: "Learn more about BARK AI Agent and our mission",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About BARK AI Agent</h1>
      <p className="text-lg mb-6">
        BARK AI Agent is a cutting-edge platform that combines the power of artificial intelligence with the Solana
        blockchain to revolutionize your trading experience.
      </p>
      <p className="text-lg mb-6">
        Our mission is to empower traders with advanced AI-driven insights, real-time market analysis, and seamless DeFi
        interactions, all while ensuring the highest levels of security and efficiency.
      </p>
      <p className="text-lg">
        With BARK AI Agent, you can optimize your trading strategies, make data-driven decisions, and stay ahead in the
        fast-paced world of cryptocurrency trading.
      </p>
    </div>
  )
}


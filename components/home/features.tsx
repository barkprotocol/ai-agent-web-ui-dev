import { Bot, BarChart3, Link, HeartHandshake, MessageSquare, Vote } from "lucide-react"

const features = [
  {
    title: "AI-Powered Trading",
    description: "Leverage advanced AI algorithms for smart, automated trading strategies.",
    icon: Bot,
  },
  {
    title: "Real-Time Market Analysis",
    description: "Get instant insights with our real-time market analysis tools.",
    icon: BarChart3,
  },
  {
    title: "Connect DeFi protocols on Solana",
    description: "Seamlessly integrate and interact with various DeFi protocols on the Solana blockchain.",
    icon: Link,
  },
  {
    title: "AI Powered Crowdfunding",
    description: "Leverage AI for disaster relief, donations, and social finance initiatives.",
    icon: HeartHandshake,
  },
  {
    title: "AI Chatbot Assistant",
    description: "Get instant support and guidance with our AI-powered chatbot.",
    icon: MessageSquare,
  },
  {
    title: "Community Governance",
    description:
      "Shape the future of BARK Protocol by voting on proposals using BARK tokens, ensuring a truly decentralized ecosystem.",
    icon: Vote,
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Powerful Features for DeFi Success</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-4 sm:p-6 rounded-lg shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50 transition-all duration-200 hover:shadow-xl"
              tabIndex={0}
            >
              <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-[#DBCFC7] mb-3 sm:mb-4" aria-hidden="true" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { SolanaBlinks } from "@/components/dashboard/solana-blinks"
import { Analytics } from "@/components/dashboard/analytics"
import { AgentPerformance } from "@/components/dashboard/agent-performance"
import { Home, Activity, Zap, Coins, BarChart2, BotIcon as Robot, MessageSquare } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChatInterface } from "@/components/chat/chat-interface"

interface MarketData {
  solanaPrice: number
  usdcPrice: number
  barkPrice: number
  topCryptos: any[]
}

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    async function fetchMarketData() {
      try {
        const response = await fetch("/api/market-data")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setMarketData(data)
        setError(null)
        setShowError(false)
      } catch (error) {
        console.error("Error fetching market data:", error)
        setError("Failed to fetch market data. Please try again later.")
        setShowError(true)
        setTimeout(() => setShowError(false), 5000)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: "overview", icon: Home, label: "Overview" },
    { id: "activity", icon: Activity, label: "Recent Activity" },
    { id: "actions", icon: Zap, label: "Quick Actions" },
    { id: "solana", icon: Coins, label: "Solana Blinks" },
    { id: "analytics", icon: BarChart2, label: "Analytics" },
    { id: "performance", icon: Robot, label: "Agent Performance" },
    { id: "chat", icon: MessageSquare, label: "Chat" },
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-10">
      <div className="space-y-1.5">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your AI agents' performance and market activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solana Price</CardTitle>
            <Coins className="h-4 w-4 text-[#DBCFC7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData?.solanaPrice.toFixed(2) || "0.00"}</div>
            <p className="text-xs text-gray-500">Updated every minute</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BARK Price</CardTitle>
            <Coins className="h-4 w-4 text-[#DBCFC7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData?.barkPrice.toFixed(2) || "0.05"}</div>
            <p className="text-xs text-gray-500">Updated every minute</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Robot className="h-4 w-4 text-[#DBCFC7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-gray-500">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#DBCFC7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">+1 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TooltipProvider>
          <TabsList className="flex w-full justify-between">
            {tabs.map((tab) => (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={tab.id}
                    className="flex-1 h-12 data-[state=active]:bg-[#DBCFC7] data-[state=active]:text-black"
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="sr-only">{tab.label}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tab.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TabsList>
        </TooltipProvider>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Overview marketData={marketData} />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4 mt-4">
          <RecentActivity />
        </TabsContent>
        <TabsContent value="actions" className="space-y-4 mt-4">
          <QuickActions />
        </TabsContent>
        <TabsContent value="solana" className="space-y-4 mt-4">
          <SolanaBlinks marketData={marketData} />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4 mt-4">
          <Analytics marketData={marketData} />
        </TabsContent>
        <TabsContent value="performance" className="space-y-4 mt-4">
          <AgentPerformance />
        </TabsContent>
        <TabsContent value="chat" className="space-y-4 mt-4">
          <ChatInterface />
        </TabsContent>
      </Tabs>

      {error && showError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}


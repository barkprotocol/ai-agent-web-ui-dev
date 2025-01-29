import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardContent } from "@/components/dashboard/content"
import { BirdeyeTimeframe } from "@/ai/solana/birdeye"
import { getTopTraders } from "@/server/actions/birdeye"
import TopTrader from "@/components/top-trader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TokenGrid } from "@/components/token/token-grid"
import { getTrendingTokens } from "@/lib/tokens"
import { fetchUserData, fetchUserPortfolio, fetchUserTransactions } from "@/lib/dashboard-utils"
import { usePrivy } from "@privy-io/react-auth"
import { debugLog } from "@/lib/debug-utils"
import { FAQ } from "@/components/dashboard/faq"

export default async function DashboardPage() {
  debugLog("Rendering DashboardPage", null, { module: "Dashboard", level: "info" })
  const { user } = usePrivy()
  const timeframe = BirdeyeTimeframe.LAST_7D
  const traders = await getTopTraders({ timeframe })
  const trendingTokens = await getTrendingTokens()

  // Fetch user-specific data
  debugLog("Fetching user data", { userId: user.id }, { module: "Dashboard", level: "info" })
  const userData = await fetchUserData(user.id)
  const userPortfolio = await fetchUserPortfolio(user.id)
  const userTransactions = await fetchUserTransactions(user.id)

  debugLog(
    "User data fetched",
    {
      portfolioSize: userPortfolio.length,
      transactionsCount: userTransactions.length,
    },
    { module: "Dashboard", level: "info" },
  )

  return (
    <DashboardShell>
      <DashboardHeader userData={userData} />
      <DashboardContent userPortfolio={userPortfolio} userTransactions={userTransactions} />

      {/* Top Traders Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Top Traders</CardTitle>
          <CardDescription>Top performers on Solana DEXes</CardDescription>
        </CardHeader>
        <CardContent>
          {traders && traders.length > 0 ? (
            traders.map((trader, index) => <TopTrader key={trader.address} trader={trader} rank={index + 1} />)
          ) : (
            <p>No top traders found for this timeframe.</p>
          )}
        </CardContent>
      </Card>

      {/* Trending Tokens Section */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Tokens</CardTitle>
          <CardDescription>Popular tokens in the Solana ecosystem</CardDescription>
        </CardHeader>
        <CardContent>
          <TokenGrid tokens={trendingTokens} />
        </CardContent>
      </Card>

      {/* User Portfolio Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Portfolio</CardTitle>
          <CardDescription>Your current token holdings</CardDescription>
        </CardHeader>
        <CardContent>
          <TokenGrid tokens={userPortfolio} />
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about BARK AI Agent</CardDescription>
        </CardHeader>
        <CardContent>
          <FAQ />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}


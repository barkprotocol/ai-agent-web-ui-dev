import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { MarketData } from "@/types/market"

interface AnalyticsProps {
  marketData: MarketData | null
}

export function Analytics({ marketData }: AnalyticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Market Overview</h3>
            <p>Total Market Cap: ${marketData?.totalMarketCap?.toLocaleString() || "N/A"}</p>
            <p>24h Volume: ${marketData?.volume24h?.toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium">Top Performers</h3>
            <ul className="list-disc list-inside">
              {marketData?.topCryptos?.slice(0, 3).map((crypto, index) => (
                <li key={index}>
                  {crypto.symbol}: ${crypto.price.toFixed(2)} ({crypto.change24h > 0 ? "+" : ""}
                  {crypto.change24h.toFixed(2)}%)
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium">BARK Token</h3>
            <p>Price: ${marketData?.barkPrice?.toFixed(4) || "N/A"}</p>
            <p>24h Change: {marketData?.barkChange24h?.toFixed(2) || "N/A"}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


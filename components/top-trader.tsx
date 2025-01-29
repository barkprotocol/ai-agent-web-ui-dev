import type { Trader } from "@/types/trader"

interface TopTraderProps {
  trader: Trader
  rank: number
}

export default function TopTrader({ trader, rank }: TopTraderProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="flex items-center">
        <span className="font-bold mr-2">#{rank}</span>
        <span className="text-sm">
          {trader.address.slice(0, 6)}...{trader.address.slice(-4)}
        </span>
      </div>
      <div>
        <span className="font-semibold">${trader.totalValue.toFixed(2)}</span>
      </div>
    </div>
  )
}


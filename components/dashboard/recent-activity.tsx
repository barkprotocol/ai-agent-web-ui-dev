import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    { id: 1, type: "Trade", description: "SOL/USDC - Buy 10 SOL at $20.5", time: "5 minutes ago" },
    { id: 2, type: "Agent", description: "Agent #3 started a new trading session", time: "10 minutes ago" },
    { id: 3, type: "System", description: "Market analysis completed", time: "15 minutes ago" },
    { id: 4, type: "Trade", description: "BARK/USDC - Sell 100 BARK at $0.07", time: "20 minutes ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


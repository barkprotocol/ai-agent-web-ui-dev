import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AgentPerformance() {
  const agents = [
    { id: 1, name: "Agent 1", performance: "+5.2%", trades: 120 },
    { id: 2, name: "Agent 2", performance: "-1.8%", trades: 85 },
    { id: 3, name: "Agent 3", performance: "+3.7%", trades: 150 },
    { id: 4, name: "Agent 4", performance: "+0.9%", trades: 95 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {agents.map((agent) => (
            <li key={agent.id} className="flex justify-between items-center">
              <span className="font-medium">{agent.name}</span>
              <div className="text-right">
                <p className={agent.performance.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {agent.performance}
                </p>
                <p className="text-sm text-gray-500">{agent.trades} trades</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


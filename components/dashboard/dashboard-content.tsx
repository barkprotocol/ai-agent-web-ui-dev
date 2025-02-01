"use client"

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface DashboardContentProps {
  hasEAPAccess: boolean
}

export function DashboardContent({ hasEAPAccess }: DashboardContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { user, authenticated, logout } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [authenticated, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.email || "User"}!</CardTitle>
          <CardDescription>This is your personal dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you can manage your BARK AI Agent settings and view your activity.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI Agents</CardTitle>
          <CardDescription>Your active AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          {hasEAPAccess ? (
            <p>You have access to EAP features. Start using your AI agents!</p>
          ) : (
            <p>Purchase EAP access to use AI agents.</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No recent activity to display.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogout}>Logout</Button>
        </CardContent>
      </Card>
      {!hasEAPAccess && (
        <Card>
          <CardHeader>
            <CardTitle>EAP Access</CardTitle>
            <CardDescription>Get early access to BARK AI Agent features</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/pricing")}>Purchase EAP Access</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


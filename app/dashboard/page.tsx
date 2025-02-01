import type { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { getServerSession } from "next-auth"
import { auth } from "@/lib/auth"
import { checkEAPAccess } from "@/lib/eap"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard | BARK AI Agent",
  description: "Your personal dashboard for BARK AI Agent",
}

export default async function DashboardPage() {
  const session = await getServerSession(auth)
  if (!session || !session.user) {
    redirect("/login")
  }

  const hasEAPAccess = await checkEAPAccess(session.user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DashboardContent hasEAPAccess={hasEAPAccess} />
    </div>
  )
}


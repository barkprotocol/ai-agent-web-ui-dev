import type { UserData } from "@/types/user"

interface DashboardHeaderProps {
  userData: UserData
}

export function DashboardHeader({ userData }: DashboardHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold">Welcome, {userData.name}</h1>
      <p className="text-muted-foreground">Here's an overview of your account</p>
    </header>
  )
}


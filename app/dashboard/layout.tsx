import dynamic from "next/dynamic"
import type { ReactNode } from "react"

const AuthProviders = dynamic(() => import("@/components/provider-auth"), {
  ssr: false,
})

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AuthProviders>{children}</AuthProviders>
}


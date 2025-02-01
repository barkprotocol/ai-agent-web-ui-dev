"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { useTheme } from "next-themes"
import { useState, useEffect, useMemo } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { ReactNode } from "react"
import { debugLog } from "@/lib/utils"

interface AuthProvidersProps {
  children: ReactNode
}

export default function AuthProviders({ children }: AuthProvidersProps) {
  const { resolvedTheme } = useTheme()
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const privyConfig = useMemo(() => {
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

    if (!privyAppId) {
      console.error("Missing Privy configuration: NEXT_PUBLIC_PRIVY_APP_ID is not set")
      setError("Missing Privy configuration. Please check your environment variables.")
      return null
    }

    return {
      appId: privyAppId,
      config: {
        appearance: {
          theme: resolvedTheme === "dark" ? "dark" : "light",
          logo: "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp",
        },
        loginMethods: ["email", "wallet"],
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: false,
        },
        supportedChains: [{ id: 1399811149, name: "Solana" }],
      },
    }
  }, [resolvedTheme])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />
      </div>
    )
  }

  if (error || !privyConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            <p>{error || "Failed to initialize authentication. Please try again later."}</p>
            {!privyConfig && (
              <p className="mt-2">
                Please check your environment variables and ensure NEXT_PUBLIC_PRIVY_APP_ID is set.
              </p>
            )}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <PrivyProvider
      appId={privyConfig.appId}
      config={privyConfig.config}
      onSuccess={(user) => {
        console.log("User authenticated:", user)
        debugLog("Privy authentication successful", { userId: user.id }, { module: "AuthProviders" })
      }}
      onError={(error) => {
        console.error("Privy initialization error:", error)
        debugLog("Privy initialization error", error, { module: "AuthProviders", level: "error" })
        setError("An error occurred during authentication. Please try again later.")
      }}
    >
      {children}
    </PrivyProvider>
  )
}


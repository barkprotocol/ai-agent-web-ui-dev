"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { connected, disconnect } = useWallet()
  const router = useRouter()

  useEffect(() => {
    setIsAuthenticated(connected)
  }, [connected])

  const logout = useCallback(async () => {
    await disconnect()
    router.push("/dashboard")
  }, [disconnect, router])

  return {
    isAuthenticated,
    logout,
  }
}


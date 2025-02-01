"use client"

import useSWR from "swr"

export function useEmbeddedWallets() {
  return useSWR("embeddedWallets", async () => {
    const response = await fetch("/api/sync-embedded-wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to sync wallets")
    }

    const result = await response.json()
    if (!result.success) {
      throw new Error(result.error ?? "Failed to sync wallets")
    }

    return result.data.wallets
  })
}


"use client"

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { TorusWalletAdapter, LedgerWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo, type ReactNode, useEffect } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { toast } from "@/components/ui/use-toast"
import { RPC_URL, HELIUS_RPC_URL } from "@/lib/config"
import { usePrivy } from "@privy-io/react-auth"
import { PrivyEmbeddedWallet } from "@/lib/privy-embedded-wallet"
import { debugLog } from "@/lib/utils"

import "@solana/wallet-adapter-react-ui/styles.css"
import "@/app/styles/wallet-adapter.css"

interface WalletContextProviderProps {
  children: ReactNode
  network?: WalletAdapterNetwork
  endpoint?: string
}

export function WalletContextProvider({
  children,
  network = WalletAdapterNetwork.Mainnet,
  endpoint: customEndpoint,
}: WalletContextProviderProps) {
  const endpoint = useMemo(
    () => customEndpoint || HELIUS_RPC_URL || RPC_URL || clusterApiUrl(network),
    [network, customEndpoint],
  )
  const { user } = usePrivy()

  const wallets = useMemo(() => {
    const baseWallets = [new TorusWalletAdapter(), new LedgerWalletAdapter()]

    if (user?.wallet?.address) {
      const privyWallet = new PrivyEmbeddedWallet(user.wallet.address, user.id)
      return [privyWallet, ...baseWallets]
    }

    return baseWallets
  }, [user])

  const onError = (error: Error) => {
    debugLog("Wallet error", error, { module: "WalletContextProvider", level: "error" })
    console.error("Wallet error:", error)
    toast({
      title: "Wallet Error",
      description: "An error occurred with your wallet. Please try again or contact support if the issue persists.",
      variant: "destructive",
    })
  }

  useEffect(() => {
    debugLog("Wallet context initialized", { network, endpoint }, { module: "WalletContextProvider" })
  }, [network, endpoint])

  return (
    <ErrorBoundary>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect onError={onError}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ErrorBoundary>
  )
}


"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function WalletButton() {
  const { connected, connecting, connect, disconnect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const handleConnect = async () => {
    setIsConnecting(true)
    setConnectionError(null)
    try {
      await connect()
      toast.success("Wallet connected successfully")
    } catch (error) {
      console.error("Wallet connection error:", error)
      setConnectionError("Failed to connect wallet. You can still use most features of the website.")
      toast.error("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      toast.success("Wallet disconnected successfully")
    } catch (error) {
      console.error("Wallet disconnection error:", error)
      toast.error("Failed to disconnect wallet")
    }
  }

  if (connected) {
    return (
      <WalletMultiButton
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded transition-colors duration-200"
        onClick={handleDisconnect}
      />
    )
  }

  return (
    <>
      <Button
        onClick={handleConnect}
        disabled={connecting || isConnecting}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        {connecting || isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect Wallet"
        )}
      </Button>
      {connectionError && (
        <Alert variant="destructive" className="mt-2">
          <AlertTitle>Wallet Connection Error</AlertTitle>
          <AlertDescription>
            {connectionError}
            <p className="mt-2">If the problem persists, please contact support.</p>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}


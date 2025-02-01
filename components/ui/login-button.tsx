"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogIn, Loader2 } from "lucide-react"
import { useState, useCallback } from "react"
import { toast } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"
import Link from "next/link"

interface LoginButtonProps {
  onLogin: () => Promise<void>
  connectWallet: () => Promise<void>
  user?: {
    name: string
    image: string
  }
}

export function LoginButton({ onLogin, connectWallet, user }: LoginButtonProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)

  const handleLogin = useCallback(async () => {
    setIsLoggingIn(true)
    try {
      await onLogin()
      toast.success("Logged in successfully!")
    } catch (error) {
      console.error("Failed to log in:", error)
      toast.error(`Failed to log in: ${error instanceof Error ? error.message : "Please try again later."}`)
    } finally {
      setIsLoggingIn(false)
    }
  }, [onLogin])

  const handleConnectWallet = useCallback(async () => {
    setIsConnectingWallet(true)
    try {
      await connectWallet()
      toast.success("Wallet connected successfully!")
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast.error(`Failed to connect wallet: ${error instanceof Error ? error.message : "Please try again later."}`)
    } finally {
      setIsConnectingWallet(false)
    }
  }, [connectWallet])

  return (
    <ErrorBoundary>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-black hover:bg-gray-900 text-white border-gray-700 transition-all"
              aria-label="User menu"
            >
              <img src={user.image || "/placeholder.svg"} alt={user.name} className="h-6 w-6 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            onClick={handleLogin}
            className="bg-black hover:bg-gray-900 text-white border-gray-700 transition-all"
            disabled={isLoggingIn}
            aria-label={isLoggingIn ? "Logging in..." : "Login"}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <Link href="/signup" passHref>
            <Button
              className="bg-white hover:bg-gray-100 text-black border border-gray-300 transition-all"
              aria-label="Sign Up"
            >
              Sign Up
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-black hover:bg-gray-900 text-white border-gray-700 transition-all"
                aria-label="Connect Wallet"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleConnectWallet} disabled={isConnectingWallet}>
                {isConnectingWallet ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </ErrorBoundary>
  )
}


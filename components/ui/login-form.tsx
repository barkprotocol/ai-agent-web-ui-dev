"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { signIn, signOut, signUpWithGoogle } from "@/lib/auth"
import { toast } from "sonner"
import { useWallet } from "@solana/wallet-adapter-react"
import type React from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, connectWallet } = usePrivy()
  const { connected, publicKey, signMessage } = useWallet()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          // Admin login successful
          router.push("/admin")
        } else {
          throw new Error("Invalid admin credentials")
        }
      } else {
        // Regular user login
        await signIn(email)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("Failed to sign in. Please check your credentials and try again.")
      toast.error("Failed to sign in. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePrivyLogin() {
    setIsLoading(true)
    try {
      await login()
      router.push("/dashboard")
    } catch (error) {
      console.error("Privy login error:", error)
      setError("Failed to log in with Privy. Please try again.")
      toast.error("Failed to log in with Privy. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConnectWallet() {
    setIsLoading(true)
    try {
      if (!connected) {
        await connectWallet()
      }
      if (publicKey && signMessage) {
        const message = "Sign this message to access the dashboard"
        const encodedMessage = new TextEncoder().encode(message)
        await signMessage(encodedMessage)
        router.push("/dashboard")
      } else {
        throw new Error("Wallet connection successful, but publicKey or signMessage is not available")
      }
    } catch (error) {
      console.error("Wallet connection error:", error)
      setError(error instanceof Error ? error.message : "Failed to connect wallet. Please try again.")
      toast.error(error instanceof Error ? error.message : "Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    try {
      await signUpWithGoogle()
      router.push("/dashboard")
    } catch (error) {
      console.error("Google sign in error:", error)
      setError("Failed to sign in with Google. Please try again.")
      toast.error("Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSolanaLogin() {
    setIsLoading(true)
    try {
      if (!connected) {
        await connectWallet()
      }
      if (publicKey && signMessage) {
        const message = "Sign this message to access the BARK AI Agent dashboard"
        const encodedMessage = new TextEncoder().encode(message)
        const signedMessage = await signMessage(encodedMessage)

        if (signedMessage) {
          router.push("/dashboard")
        } else {
          throw new Error("Failed to sign message")
        }
      } else {
        throw new Error("Wallet connected, but publicKey or signMessage is not available")
      }
    } catch (error) {
      console.error("Solana wallet login error:", error)
      setError(error instanceof Error ? error.message : "Failed to login with Solana wallet. Please try again.")
      toast.error(error instanceof Error ? error.message : "Failed to login with Solana wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignOut() {
    setIsLoading(true)
    try {
      await signOut()
      toast.success("Signed out successfully")
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      setError("Failed to sign out. Please try again.")
      toast.error("Failed to sign out. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.login className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignIn}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handlePrivyLogin}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.key className="mr-2 h-4 w-4" />}{" "}
        Login with Privy
      </Button>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleConnectWallet}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.wallet className="mr-2 h-4 w-4" />
        )}{" "}
        Connect Wallet
      </Button>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleSolanaLogin} className="w-full">
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.wallet className="mr-2 h-4 w-4" />
        )}{" "}
        Login with Solana Wallet
      </Button>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleSignOut} className="w-full">
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.logout className="mr-2 h-4 w-4" />
        )}{" "}
        Sign Out
      </Button>
    </div>
  )
}


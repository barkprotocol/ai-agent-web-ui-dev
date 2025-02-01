"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { toast } from "sonner"
import { useWallet } from "@solana/wallet-adapter-react"
import type React from "react" // Added import for React

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, loginWithEmail, authenticated } = usePrivy()
  const { select } = useWallet()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await loginWithEmail(email)
      toast.success("Login link sent to your email")
    } catch (error) {
      console.error("Email login error:", error)
      toast.error("Failed to send login link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrivyLogin = async () => {
    setIsLoading(true)
    try {
      await login()
      // Select the Privy embedded wallet
      await select("PrivyEmbeddedWallet")
      router.push("/dashboard")
    } catch (error) {
      console.error("Privy login error:", error)
      toast.error("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (authenticated) {
    router.push("/dashboard")
    return null
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleEmailLogin}>
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
          <Button disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.mail className="mr-2 h-4 w-4" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-50 dark:bg-gray-900 px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handlePrivyLogin}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.key className="mr-2 h-4 w-4" />}
        Login with Privy
      </Button>
    </div>
  )
}


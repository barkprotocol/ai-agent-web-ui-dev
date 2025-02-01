"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { toast } from "sonner"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, loginWithEmail, authenticated } = usePrivy()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await loginWithEmail(email)
      toast.success("Signup link sent to your email")
    } catch (error) {
      console.error("Email signup error:", error)
      toast.error("Failed to send signup link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrivySignUp = async () => {
    setIsLoading(true)
    try {
      await login()
    } catch (error) {
      console.error("Privy signup error:", error)
      toast.error("Failed to sign up. Please try again.")
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
      <form onSubmit={handleEmailSignUp}>
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
            Sign Up with Email
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
      <Button variant="outline" type="button" disabled={isLoading} onClick={handlePrivySignUp}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.key className="mr-2 h-4 w-4" />}
        Sign Up with Privy
      </Button>
    </div>
  )
}


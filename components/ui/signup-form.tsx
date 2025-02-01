"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { signUp, signUpWithGoogle } from "@/lib/auth"
import { toast } from "sonner"
import { useWallet } from "@solana/wallet-adapter-react"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff } from "lucide-react"
import debounce from "lodash/debounce"
import type React from "react"

const generateCaptcha = () => {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [captcha, setCaptcha] = useState(generateCaptcha())
  const [userCaptcha, setUserCaptcha] = useState("")
  const router = useRouter()
  const { login, connectWallet } = usePrivy()
  const { connected, publicKey, signMessage } = useWallet()

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters long" },
    { regex: /[A-Z]/, text: "At least one uppercase letter" },
    { regex: /[a-z]/, text: "At least one lowercase letter" },
    { regex: /[0-9]/, text: "At least one number" },
    { regex: /[^A-Za-z0-9]/, text: "At least one special character" },
  ]

  const validateForm = useCallback(() => {
    if (!email) {
      setError("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format")
      return false
    }
    if (!password) {
      setError("Password is required")
      return false
    }
    if (!passwordRequirements.every((req) => req.regex.test(password))) {
      setError("Password does not meet all requirements")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (userCaptcha.toUpperCase() !== captcha) {
      setError("CAPTCHA is incorrect")
      return false
    }
    return true
  }, [email, password, confirmPassword, userCaptcha, captcha])

  const calculatePasswordStrength = useCallback((pass: string) => {
    let strength = 0
    passwordRequirements.forEach((req) => {
      if (req.regex.test(pass)) strength += 20
    })
    setPasswordStrength(strength)
  }, [])

  const debouncedCalculatePasswordStrength = debounce(calculatePasswordStrength, 300)

  useEffect(() => {
    return () => {
      debouncedCalculatePasswordStrength.cancel()
    }
  }, [debouncedCalculatePasswordStrength])

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      await signUp(email, password)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up error:", error)
      setError("Failed to sign up. Please try again.")
      toast.error("Failed to sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      await signUpWithGoogle()
      router.push("/dashboard")
    } catch (error) {
      console.error("Google sign up error:", error)
      setError("Failed to sign up with Google. Please try again.")
      toast.error("Failed to sign up with Google. Please try again.")
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
            <Label htmlFor="email">Email</Label>
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
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  debouncedCalculatePasswordStrength(e.target.value)
                }}
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Progress value={passwordStrength} className="w-full" />
            <p className="text-xs text-muted-foreground">
              Password strength: {passwordStrength === 100 ? "Strong" : passwordStrength >= 60 ? "Medium" : "Weak"}
            </p>
            <ul className="text-xs text-muted-foreground list-disc list-inside">
              {passwordRequirements.map((req, index) => (
                <li key={index} className={req.regex.test(password) ? "text-green-500" : ""}>
                  {req.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="captcha">CAPTCHA</Label>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 p-2 rounded font-mono text-lg">{captcha}</div>
              <Button type="button" onClick={() => setCaptcha(generateCaptcha())}>
                Refresh
              </Button>
            </div>
            <Input
              id="captcha"
              placeholder="Enter CAPTCHA"
              type="text"
              disabled={isLoading}
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.user className="mr-2 h-4 w-4" />
            )}
            Sign Up
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
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignUp}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <div className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  )
}


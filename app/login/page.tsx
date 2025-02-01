import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Login | BARK AI Agent",
  description: "Login to your BARK AI Agent account",
}

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent className="bg-gray-50 dark:bg-gray-900 p-6 rounded-b-lg">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}


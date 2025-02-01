import type { Metadata } from "next"
import { SignUpForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sign Up | BARK AI Agent",
  description: "Create a new BARK AI Agent account",
}

export default function SignUpPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Choose your preferred signup method</CardDescription>
        </CardHeader>
        <CardContent className="bg-gray-50 dark:bg-gray-900 p-6 rounded-b-lg">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}


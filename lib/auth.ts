import { PrivyClient } from "@privy-io/react-auth"
import { toast } from "sonner"

const privy = new PrivyClient({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
})

export async function signInWithPrivy(): Promise<void> {
  try {
    await privy.login()
    toast.success("Signed in with Privy successfully.")
  } catch (error) {
    console.error("Error during Privy sign in:", error)
    toast.error("Failed to sign in with Privy. Please try again.")
    throw new Error("Failed to sign in with Privy. Please try again.")
  }
}

export async function signIn(email: string): Promise<void> {
  try {
    await privy.sendLoginEmail({ email })
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Sign In to BARK AI Agent",
        html: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify">here</a> to sign in to your BARK AI Agent account.</p>`,
      }),
    })
    toast.success("Sign-in link sent to your email.")
  } catch (error) {
    console.error("Error during sign in:", error)
    toast.error("Failed to sign in. Please try again.")
    throw new Error("Failed to sign in. Please try again.")
  }
}

export async function signUp(email: string): Promise<void> {
  try {
    await privy.sendLoginEmail({ email })
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Welcome to BARK AI Agent",
        html: `<p>Welcome to BARK AI Agent! Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify">here</a> to verify your email and complete your registration.</p>`,
      }),
    })
    toast.success("Sign-up successful. Please check your email to verify your account.")
  } catch (error) {
    console.error("Error during sign up:", error)
    toast.error("Failed to sign up. Please try again.")
    throw new Error("Failed to sign up. Please try again.")
  }
}

export async function signOut(): Promise<void> {
  try {
    await privy.logout()
    toast.success("Signed out successfully.")
  } catch (error) {
    console.error("Error during sign out:", error)
    toast.error("Failed to sign out. Please try again.")
    throw new Error("Failed to sign out. Please try again.")
  }
}

export async function signInWithGoogle(): Promise<void> {
  try {
    await privy.loginWithGoogle()
    toast.success("Signed in with Google successfully.")
  } catch (error) {
    console.error("Error during Google sign in:", error)
    toast.error("Failed to sign in with Google. Please try again.")
    throw new Error("Failed to sign in with Google. Please try again.")
  }
}

export async function connectWallet(): Promise<void> {
  try {
    await privy.connectWallet()
    toast.success("Wallet connected successfully.")
  } catch (error) {
    console.error("Error connecting wallet:", error)
    toast.error("Failed to connect wallet. Please try again.")
    throw new Error("Failed to connect wallet. Please try again.")
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await privy.sendResetPasswordEmail({ email })
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Reset Your BARK AI Agent Password",
        html: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset-password">here</a> to reset your BARK AI Agent account password.</p>`,
      }),
    })
    toast.success("Password reset email sent. Please check your inbox.")
  } catch (error) {
    console.error("Error during password reset:", error)
    toast.error("Failed to send password reset email. Please try again.")
    throw new Error("Failed to send password reset email. Please try again.")
  }
}


import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletContextProvider } from "@/components/wallet-context-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import AuthProviders from "@/components/auth-providers"
import { cn } from "@/lib/utils"
import { Oswald, Inter, Poppins } from "next/font/google"
import "@/app/styles/globals.css"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "BARK AI Agent",
  description: "Your intelligent copilot for Solana trading and DeFi interactions",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${oswald.variable} ${inter.variable} ${poppins.variable}`}>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <WalletContextProvider>
              <AuthProviders>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </AuthProviders>
            </WalletContextProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
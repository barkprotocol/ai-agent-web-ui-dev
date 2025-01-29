import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/provider-theme"
import { WalletContextProvider } from "@/components/wallet-context-provider"
import { Header } from "@/components/ui/layout/header"
import { Footer } from "@/components/ui/layout/footer"
import ErrorBoundary from "@/components/error-boundary"
import "@/app/styles/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "BARK | AI Agent for Solana",
  description: "AI-powered copilot for Solana blockchain interactions",
  keywords: ["BARK", "AI", "Solana", "Blockchain", "DeFi"],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WalletContextProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </WalletContextProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'
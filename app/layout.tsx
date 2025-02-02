import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletContextProvider } from "@/components/wallet-context-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import AuthProviders from "@/components/auth-providers";
import { cn } from "@/lib/utils";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "BARK AI Agent",
  description: "Your intelligent copilot for Solana trading and DeFi interactions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <WalletContextProvider>
              <AuthProviders>
                <div className="flex flex-col min-h-screen">
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
  );
}

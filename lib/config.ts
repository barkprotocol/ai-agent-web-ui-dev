export const APP_VERSION = process.env.npm_package_version || "1.0.0"
export const IS_BETA = true
export const NO_CONFIRMATION_MESSAGE = " (No confirmation required)"
export const MAX_TOKEN_MESSAGES = 10
export const HELIUS_RPC_URL =
  process.env.NEXT_PUBLIC_HELIUS_RPC_URL || "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY"
export const RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL || "https://api.mainnet-beta.solana.com"

// Add more constants as needed
export const DEFAULT_LANGUAGE = "en"
export const SUPPORTED_LANGUAGES = ["en"] as const

// Add some type definitions for better type safety
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

// Add an interface for app configuration
export interface AppConfig {
  version: string
  isBeta: boolean
  maxTokenMessages: number
  rpcUrl: string
  defaultLanguage: SupportedLanguage
}

// Create a config object that can be easily imported and used throughout the app
export const appConfig: AppConfig = {
  version: APP_VERSION,
  isBeta: IS_BETA,
  maxTokenMessages: MAX_TOKEN_MESSAGES,
  rpcUrl: RPC_URL,
  defaultLanguage: DEFAULT_LANGUAGE,
}


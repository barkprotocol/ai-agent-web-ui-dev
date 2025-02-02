import type { ReactNode } from "react"
import type React from "react"
import type { z } from "zod"

import { actionTools } from "./generic/action"
import { jinaTools } from "./generic/jina"
import { telegramTools } from "./generic/telegram"
import { utilTools } from "./generic/util"
import { chartTools } from "./solana/chart"
import { definedTools } from "./solana/defined-fi"
import { dexscreenerTools } from "./solana/dexscreener"
import { jupiterTools } from "./solana/jupiter"
import { magicEdenTools } from "./solana/magic-eden"
import { pumpfunTools } from "./solana/pumpfun"
import { solanaTools } from "./solana/solana"
import { birdeyeTools } from "./solana/birdeye"

export interface ToolConfig {
  displayName?: string
  icon?: ReactNode
  isCollapsible?: boolean
  isExpandedByDefault?: boolean
  description: string
  parameters: z.ZodType<any>
  execute?: <T>(params: z.infer<T extends z.ZodType ? T : never>) => Promise<any>
  render?: (result: unknown) => React.ReactNode | null
  agentKit?: any
  userId?: any
  requiresConfirmation?: boolean
}

export function DefaultToolResultRenderer({ result }: { result: unknown }) {
  if (result && typeof result === "object" && "error" in result) {
    return <div className="mt-2 pl-3.5 text-sm text-destructive">{String((result as { error: unknown }).error)}</div>
  }

  return (
    <div className="mt-2 border-l border-border/40 pl-3.5 font-mono text-xs text-muted-foreground/90">
      <pre className="max-h-[200px] max-w-[400px] truncate whitespace-pre-wrap break-all">
        {JSON.stringify(result, null, 2).trim()}
      </pre>
    </div>
  )
}

export const defaultTools: Record<string, ToolConfig> = {
  ...actionTools,
  ...solanaTools,
  ...definedTools,
  ...pumpfunTools,
  ...jupiterTools,
  ...dexscreenerTools,
  ...magicEdenTools,
  ...jinaTools,
  ...utilTools,
  ...chartTools,
  ...telegramTools,
  ...birdeyeTools,
}

export const coreTools: Record<string, ToolConfig> = {
  ...actionTools,
  ...utilTools,
  ...jinaTools,
}

export const toolsets: Record<string, { tools: string[]; description: string }> = {
  coreTools: {
    tools: ["actionTools", "utilTools", "jupiterTools"],
    description:
      "Core utility tools for general operations, including actions, searching token info, utility functions.",
  },
  webTools: {
    tools: ["jinaTools"],
    description: "Web scraping and content extraction tools for reading web pages and extracting content.",
  },
  defiTools: {
    tools: ["solanaTools", "dexscreenerTools"],
    description:
      "Tools for interacting with DeFi protocols on Solana, including swaps, market data, token information and details.",
  },
  traderTools: {
    tools: ["birdeyeTools"],
    description: "Tools for analyzing and tracking traders and trades on Solana DEXes.",
  },
  financeTools: {
    tools: ["definedTools"],
    description:
      "Tools for retrieving and applying logic to static financial data, including analyzing trending tokens.",
  },
  tokenLaunchTools: {
    tools: ["pumpfunTools"],
    description: "Tools for launching tokens on PumpFun, including token deployment and management.",
  },
  chartTools: {
    tools: ["chartTools"],
    description: "Tools for generating and displaying various types of charts.",
  },
  nftTools: {
    tools: ["magicEdenTools"],
    description: "Tools for interacting with NFTs, including Magic Eden integrations.",
  },
  socialTools: {
    tools: ["telegramTools"],
    description: "Tools for interacting with Telegram for notifications and messaging.",
  },
  charityTools: {
    tools: ["charityTools"],
    description: "Tools for managing charity and donation activities on Solana.",
  },
  metaplexTools: {
    tools: ["metaplexTools"],
    description: "Tools for interacting with Metaplex for NFT creation and management on Solana.",
  },
  crowdfundingTools: {
    tools: ["crowdfundingTools"],
    description: "Tools for managing crowdfunding campaigns on Solana.",
  },
  barkTokenTools: {
    tools: ["barkTokenTools"],
    description: "Tools for interacting with BARK token, including swaps and token information.",
  },
}

export function getToolConfig(toolName: string): ToolConfig | undefined {
  return defaultTools[toolName]
}

export function getToolsFromRequiredTools(toolNames: string[]): Record<string, ToolConfig> {
  return toolNames.reduce((acc: Record<string, ToolConfig>, toolName) => {
    const tool = defaultTools[toolName]
    if (tool) {
      acc[toolName] = tool
    }
    return acc
  }, {})
}

export const additionalToolsets = {
  solanaTools: {
    tools: ["solanaTools"],
    description: "Tools for interacting with the Solana blockchain.",
  },
  splTools: {
    tools: ["splTools"],
    description: "Tools for interacting with SPL tokens.",
  },
  programTools: {
    tools: ["programTools"],
    description: "Tools for interacting with Solana programs.",
  },
  walletTools: {
    tools: ["walletTools"],
    description: "Tools for managing Solana wallets.",
  },
  nftTools: {
    tools: ["nftTools"],
    description: "Tools for managing NFTs on Solana.",
  },
  charityTools: {
    tools: ["charityTools"],
    description: "Tools for managing charity and donation activities on Solana.",
  },
  metaplexTools: {
    tools: ["metaplexTools"],
    description: "Tools for interacting with Metaplex for NFT creation and management on Solana.",
  },
  crowdfundingTools: {
    tools: ["crowdfundingTools"],
    description: "Tools for managing crowdfunding campaigns on Solana.",
  },
  barkTokenTools: {
    tools: ["barkTokenTools"],
    description: "Tools for interacting with BARK token, including swaps and token information.",
  },
}


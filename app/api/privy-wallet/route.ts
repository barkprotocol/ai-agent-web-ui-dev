import { type NextRequest, NextResponse } from "next/server"
import { PrivyClient } from "@privy-io/server-auth"

const privyClient = new PrivyClient({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_APP_SECRET!,
})

export async function POST(req: NextRequest) {
  const { userId, transaction } = await req.json()

  if (!userId || !transaction) {
    return NextResponse.json({ error: "Missing userId or transaction" }, { status: 400 })
  }

  try {
    const user = await privyClient.getUser(userId)
    if (!user || !user.wallet?.address) {
      return NextResponse.json({ error: "User not found or has no wallet" }, { status: 404 })
    }

    const request = {
      address: user.wallet.address,
      chainType: "solana" as const,
      method: "signTransaction",
      params: {
        transaction,
      },
    }

    const { data } = await privyClient.walletApi.rpc(request)
    return NextResponse.json({ signedTransaction: data.signedTransaction })
  } catch (error) {
    console.error("Error in Privy wallet API:", error)
    return NextResponse.json({ error: "Failed to sign transaction" }, { status: 500 })
  }
}


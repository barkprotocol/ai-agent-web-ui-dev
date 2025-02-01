import { NextResponse } from "next/server"
import { PrivyClient } from "@privy-io/server-auth"
import { getServerSession } from "next-auth/next"
import { auth } from "@/lib/auth"

const privyClient = new PrivyClient({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_APP_SECRET!,
})

export async function POST() {
  try {
    const session = await getServerSession(auth)
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const privyUser = await privyClient.getUser(userId)

    if (!privyUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    const embeddedWallets = privyUser.linkedAccounts.filter(
      (account) => account.type === "wallet" && account.walletClientType === "privy",
    )

    // TODO: Implement database operations to sync embedded wallets
    // This would typically involve updating your database with the wallet information

    return NextResponse.json({
      success: true,
      data: {
        wallets: embeddedWallets.map((wallet) => ({
          id: wallet.id,
          address: wallet.address,
          chainId: wallet.chainId,
        })),
      },
    })
  } catch (error) {
    console.error("Error syncing embedded wallets:", error)
    return NextResponse.json({ success: false, error: "Failed to sync embedded wallets" }, { status: 500 })
  }
}


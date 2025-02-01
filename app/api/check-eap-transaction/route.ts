import { checkEAPTransactionLib } from "@/lib/eap"
import { type NextRequest, NextResponse } from "next/server"
import { PublicKey } from "@solana/web3.js"

const EAP_PROGRAM_ID = process.env.NEXT_PUBLIC_EAP_PROGRAM_ID
  ? new PublicKey(process.env.NEXT_PUBLIC_EAP_PROGRAM_ID)
  : null
const EAP_TOKEN_MINT = process.env.NEXT_PUBLIC_EAP_TOKEN_MINT
  ? new PublicKey(process.env.NEXT_PUBLIC_EAP_TOKEN_MINT)
  : null

if (!EAP_PROGRAM_ID || !EAP_TOKEN_MINT) {
  throw new Error("Invalid EAP_PROGRAM_ID or EAP_TOKEN_MINT")
}

export async function POST(req: NextRequest) {
  try {
    const { txHash } = await req.json()

    if (!txHash) {
      return NextResponse.json({ success: false, message: "Transaction hash is required" }, { status: 400 })
    }

    // In a real application, you would get the userId from the authenticated session
    const userId = "dummy-user-id"
    const result = await checkEAPTransactionLib({
      txHash,
      userId,
      eapProgramId: EAP_PROGRAM_ID,
      eapTokenMint: EAP_TOKEN_MINT,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in checkEAPTransaction API route:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing the request" },
      { status: 500 },
    )
  }
}


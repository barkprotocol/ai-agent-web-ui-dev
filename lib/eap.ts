import { PrivyClient } from "@privy-io/server-auth"
import { Connection, type PublicKey, type ParsedTransactionWithMeta } from "@solana/web3.js"
import prisma from "@/lib/prisma"

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"

export async function checkEAPTransactionLib({
  txHash,
  userId,
  eapProgramId,
  eapTokenMint,
}: { txHash: string; userId: string; eapProgramId: PublicKey; eapTokenMint: PublicKey }) {
  try {
    const privyClient = new PrivyClient({
      appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      appSecret: process.env.PRIVY_APP_SECRET!,
    })

    const user = await privyClient.getUser(userId)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    const solanaWalletAddress = user.wallet?.address
    if (!solanaWalletAddress) {
      return { success: false, message: "User does not have a Solana wallet" }
    }

    const connection = new Connection(SOLANA_RPC_URL)
    const transaction = await connection.getParsedTransaction(txHash, "confirmed")

    if (!transaction) {
      return { success: false, message: "Transaction not found" }
    }

    const isValidEAPTransaction = validateEAPTransaction(transaction, solanaWalletAddress, eapProgramId, eapTokenMint)

    if (isValidEAPTransaction) {
      await grantEAPAccess(userId)
      return { success: true, message: "EAP access granted successfully" }
    } else {
      return { success: false, message: "Invalid EAP transaction" }
    }
  } catch (error) {
    console.error("Error checking EAP transaction:", error)
    return { success: false, message: "An error occurred while checking the transaction" }
  }
}

function validateEAPTransaction(
  transaction: ParsedTransactionWithMeta,
  userWalletAddress: string,
  eapProgramId: PublicKey,
  eapTokenMint: PublicKey,
): boolean {
  const involvedAccounts = transaction.transaction.message.accountKeys.map((key) => key.pubkey.toBase58())
  if (!involvedAccounts.includes(eapProgramId.toBase58())) {
    return false
  }

  const instructions = transaction.transaction.message.instructions
  const transferInstruction = instructions.find(
    (ix) =>
      ix.programId.equals(eapProgramId) &&
      "parsed" in ix &&
      ix.parsed.type === "transfer" &&
      ix.parsed.info.destination === userWalletAddress,
  )

  if (!transferInstruction) {
    return false
  }

  if ("parsed" in transferInstruction && transferInstruction.parsed.info.mint !== eapTokenMint.toBase58()) {
    return false
  }

  return true
}

async function grantEAPAccess(userId: string): Promise<void> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { hasEAPAccess: true },
    })
    console.log(`EAP access granted to user ${userId}`)
  } catch (error) {
    console.error(`Error granting EAP access to user ${userId}:`, error)
    throw new Error("Failed to grant EAP access")
  }
}

export async function checkEAPAccess(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { hasEAPAccess: true },
    })
    return user?.hasEAPAccess || false
  } catch (error) {
    console.error(`Error checking EAP access for user ${userId}:`, error)
    return false
  }
}


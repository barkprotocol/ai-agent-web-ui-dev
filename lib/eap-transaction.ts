import { PrivyClient } from "@privy-io/server-auth";
import { Connection, PublicKey, type ParsedTransactionWithMeta } from "@solana/web3.js";

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const EAP_PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_EAP_PROGRAM_ID || "");
const EAP_TOKEN_MINT = new PublicKey(process.env.NEXT_PUBLIC_EAP_TOKEN_MINT || "");

export async function checkEAPTransaction({ txHash, userId }: { txHash: string; userId: string }) {
  try {
    // Initialize PrivyClient with necessary credentials
    const privyClient = new PrivyClient({
      appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      appSecret: process.env.PRIVY_APP_SECRET!,
    });

    // Fetch user information from Privy
    const user = await privyClient.getUser(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const solanaWalletAddress = user.wallet?.address;
    if (!solanaWalletAddress) {
      return { success: false, message: "User does not have a Solana wallet" };
    }

    // Create a connection to Solana blockchain
    const connection = new Connection(SOLANA_RPC_URL);

    // Get the transaction data from Solana
    const transaction = await connection.getParsedTransaction(txHash, "confirmed");
    if (!transaction) {
      return { success: false, message: "Transaction not found" };
    }

    // Validate if the transaction is a valid EAP transaction
    const isValidEAPTransaction = validateEAPTransaction(transaction, solanaWalletAddress);
    if (isValidEAPTransaction) {
      // Grant EAP access if the transaction is valid
      await grantEAPAccess(userId);
      return { success: true, message: "EAP access granted successfully" };
    } else {
      return { success: false, message: "Invalid EAP transaction" };
    }
  } catch (error) {
    console.error("Error checking EAP transaction:", error);
    return { success: false, message: "An error occurred while checking the transaction" };
  }
}

function validateEAPTransaction(transaction: ParsedTransactionWithMeta, userWalletAddress: string): boolean {
  // Ensure the transaction involves the EAP program
  const involvedAccounts = transaction.transaction.message.accountKeys.map((key) => key.pubkey.toBase58());
  if (!involvedAccounts.includes(EAP_PROGRAM_ID.toBase58())) {
    return false;
  }

  // Check if the transaction includes a token transfer to the user's wallet
  const instructions = transaction.transaction.message.instructions;
  const transferInstruction = instructions.find(
    (ix) =>
      ix.programId.equals(EAP_PROGRAM_ID) &&
      "parsed" in ix &&
      ix.parsed.type === "transfer" &&
      ix.parsed.info.destination === userWalletAddress
  );

  if (!transferInstruction) {
    return false;
  }

  // Ensure the transferred token is the correct EAP token
  if ("parsed" in transferInstruction && transferInstruction.parsed.info.mint !== EAP_TOKEN_MINT.toBase58()) {
    return false;
  }

  return true;
}

async function grantEAPAccess(userId: string): Promise<void> {
  // Implement the logic to grant EAP access to the user
  // Example could include updating a database record, setting a flag in the user's profile, etc.
  // For now, we log the action
  console.log(`Granting EAP access to user ${userId}`);
}

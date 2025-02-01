import { PublicKey, Transaction, type VersionedTransaction } from "@solana/web3.js"
import type { WalletAdapter } from "@solana/wallet-adapter-base"

export class PrivyEmbeddedWallet implements WalletAdapter {
  publicKey: PublicKey
  private userId: string

  constructor(publicKey: string, userId: string) {
    this.publicKey = new PublicKey(publicKey)
    this.userId = userId
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    try {
      const response = await fetch("/api/privy-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: this.userId,
          transaction: transaction.serialize({ verifySignatures: false }),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to sign transaction")
      }

      const { signedTransaction } = await response.json()
      return Transaction.from(Buffer.from(signedTransaction, "base64")) as T
    } catch (error) {
      throw new Error(`Failed to sign transaction: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
    return Promise.all(transactions.map((tx) => this.signTransaction(tx)))
  }

  connect() {
    return Promise.resolve()
  }

  disconnect() {
    return Promise.resolve()
  }
}


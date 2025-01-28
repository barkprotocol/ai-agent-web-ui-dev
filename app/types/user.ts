export interface User {
  id: string
  name: string | null
  email: string | null
  avatarUrl?: string
  accountType?: string
  memberSince?: string
  bio?: string
  walletAddress?: string // New field for wallet address
}

export interface UserDisplayProps {
  user: User | null
  renderEmail?: (email: string | null) => React.ReactNode
}


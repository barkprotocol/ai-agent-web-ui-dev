import type { User as PrivyUser } from "@privy-io/react-auth"

export interface BarkUser {
  id: string
  privy_id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
  privyUser: PrivyUser
}

export type { PrivyUser }


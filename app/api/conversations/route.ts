import { type NextRequest, NextResponse } from "next/server"
import { verifyUser } from "@/server/actions/user"
import { dbGetConversations } from "@/server/db/queries"
import type { Conversation } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const session = await verifyUser()
    const userId = session?.data?.data?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conversations: Conversation[] = await dbGetConversations({ userId })
    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await verifyUser()
    const userId = session?.data?.data?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 })
    }

    // TODO: Implement the deletion logic
    // const result = await dbDeleteConversation({ userId, id });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting conversation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


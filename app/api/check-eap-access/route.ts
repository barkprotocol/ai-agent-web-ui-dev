import { NextResponse } from "next/server"
import { checkEAPAccess } from "@/lib/eap"
import { getServerSession } from "next-auth"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(auth)
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const hasEAPAccess = await checkEAPAccess(userId)

    return NextResponse.json({ success: true, hasEAPAccess })
  } catch (error) {
    console.error("Error checking EAP access:", error)
    return NextResponse.json({ success: false, error: "Failed to check EAP access" }, { status: 500 })
  }
}


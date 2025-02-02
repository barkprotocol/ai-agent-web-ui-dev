import { NextResponse } from "next/server";
import verifyUser from "@/lib/auth";

export async function GET() {
  try {
    const result = await verifyUser();

    if (!result || !result.success) {
      return NextResponse.json(
        { error: "Unauthorized", message: result?.message || "Invalid user" },
        { status: 401 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}

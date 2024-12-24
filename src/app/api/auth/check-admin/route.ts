import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // @ts-ignore - we know role exists because we added it to the session
    const isAdmin = session.user.role === "admin";

    // Don't return the role directly, just return a boolean
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error('Failed to check admin status:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

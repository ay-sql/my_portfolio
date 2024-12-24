import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function withAuth() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      redirect("/auth");
    }

    // Verify admin status directly from database
    await connectToDatabase();
    const user = await User.findOne({ 
      email: session.user.email 
    }).select('+role');

    if (!user || user.role !== "admin") {
      redirect("/");
    }
  } catch (error) {
    console.error('Auth error:', error);
    redirect("/auth");
  }
}

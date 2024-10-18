import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId)
    return NextResponse.json(
      { message: "User not logged in!" },
      { status: 401 }
    );

  return NextResponse.json(user);
}

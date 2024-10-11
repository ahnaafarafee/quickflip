import { prisma } from "@/prisma";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);

  if (!userId)
    return NextResponse.json(
      { message: "You are not authorize to perform this action." },
      { status: 400 }
    );

  const deck = await prisma.deck.findUnique({
    where: { id: params.id },
  });

  if (!deck)
    return NextResponse.json({ message: "invalid deck" }, { status: 404 });

  return NextResponse.json(deck, { status: 200 });
}

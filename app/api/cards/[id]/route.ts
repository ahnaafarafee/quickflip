import { prisma } from "@/prisma";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { message: "You are not authorized to perform this action." },
      { status: 400 }
    );
  }

  const user = await clerkClient.users.getUser(userId);
  const deck = await prisma.deck.findFirst({
    where: {
      id: params.id,
      userId: user.publicMetadata.userId as string,
    },
  });

  if (!deck) {
    return NextResponse.json(
      { message: "Deck with the provided ID doesn't exist." },
      { status: 404 }
    );
  }

  const cards = await prisma.card.findMany({ where: { deckId: params.id } });
  return NextResponse.json(cards, { status: 200 });
}

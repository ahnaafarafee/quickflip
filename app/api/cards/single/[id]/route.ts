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

  const url = new URL(request.url);
  const deckId = url.searchParams.get("deckId");
  if (!deckId)
    return NextResponse.json(
      { message: "You did not provide a deck id" },
      { status: 404 }
    );

  const deck = await prisma.deck.findFirst({
    where: {
      id: deckId,
      userId: user.publicMetadata.userId as string,
    },
  });

  if (!deck) {
    return NextResponse.json(
      { message: "Deck with the provided ID doesn't exist." },
      { status: 404 }
    );
  }

  const card = await prisma.card.findUnique({
    where: {
      id: params.id,
      deckId,
    },
  });

  return NextResponse.json(card, { status: 200 });
}

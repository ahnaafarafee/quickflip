import { prisma } from "@/prisma";
import { cardFormSchema } from "@/schema";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId)
    return NextResponse.json(
      { message: "You are not authorize to perform this action." },
      { status: 400 }
    );

  const user = await clerkClient().users.getUser(userId);

  const body = await request.json();
  const { front, back, tag, deckId } = body;
  const validation = cardFormSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const deck = await prisma.deck.findUnique({
    where: { id: deckId, userId: user.publicMetadata.userId as string },
  });
  if (!deck)
    return NextResponse.json(
      { message: "Deck with the provided ID doesn't exists." },
      { status: 404 }
    );

  const existingFront = await prisma.card.findFirst({
    where: { front, deckId },
  });

  if (existingFront)
    return NextResponse.json(
      { message: "This name has already been used. Try using different name!" },
      { status: 400 }
    );

  await prisma.card.create({
    data: {
      front,
      back,
      tag,
      deckId,
    },
  });

  return NextResponse.json(
    { message: "Card created successfully!" },
    { status: 201 }
  );
}

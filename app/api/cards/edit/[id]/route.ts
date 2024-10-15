import { prisma } from "@/prisma";
import { cardFormSchema } from "@/schema";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json(
      { message: "You are not authorize to perform this action." },
      { status: 400 }
    );

  const user = await clerkClient().users.getUser(userId);

  const body = await request.json();
  const validation = cardFormSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const url = new URL(request.url);
  const deckId = url.searchParams.get("deckId");

  if (!deckId)
    return NextResponse.json(
      { message: "No deckId provided" },
      { status: 400 }
    );

  const deck = await prisma.deck.findUnique({
    where: { id: deckId, userId: user.publicMetadata.userId as string },
  });
  if (!deck)
    return NextResponse.json(
      { message: "Deck with the provided ID doesn't exists." },
      { status: 404 }
    );

  const existingFront = await prisma.card.findFirst({
    where: { front: body.front, deckId },
  });

  if (existingFront)
    return NextResponse.json(
      { message: "This name has already been used. Try using different name!" },
      { status: 400 }
    );

  await prisma.card.update({
    where: { id: params.id },
    data: {
      front: body.front,
      back: body.back,
      tag: body.tag,
    },
  });

  return NextResponse.json(
    { message: "Card updated successfully!" },
    { status: 200 }
  );
}

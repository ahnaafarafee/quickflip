import { prisma } from "@/prisma";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
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

  const url = new URL(request.url);
  const nextReview = url.searchParams.get("nextReview");

  const cards = await prisma.card.findMany({
    where: {
      deckId: params.id,
      ...(nextReview === "true" && {
        nextReview: {
          lte: new Date().toISOString(), // Including today and past dates
        },
      }),
    },
  });

  return NextResponse.json(cards, { status: 200 });
}
export async function PATCH(
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
  const body = await request.json();
  if (!body.easeFactor)
    return NextResponse.json(
      { message: "No ease factor provided" },
      { status: 400 }
    );

  const url = new URL(request.url);
  const deckId = url.searchParams.get("deckId");

  if (!deckId)
    return NextResponse.json(
      { message: "No deckId provided" },
      { status: 400 }
    );

  const user = await clerkClient.users.getUser(userId);
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
    where: { id: params.id, deckId },
  });
  if (!card)
    return NextResponse.json(
      { message: "The card you're trying to update doesn't exist." },
      { status: 404 }
    );

  let newInterval = 1;
  let newNextReview = new Date(Date.now()).toISOString();
  if (body.easeFactor === 1) {
    newInterval = 1;
    newNextReview = new Date(Date.now()).toISOString();
  } else if (body.easeFactor !== 1) {
    newInterval = card.interval * card.easeFactor;
    card.interval = newInterval;
    newNextReview = new Date(
      card.nextReview.getTime() + newInterval * 86400000
    ).toISOString();
  }

  await prisma.card.update({
    where: { id: params.id },
    data: {
      easeFactor: body.easeFactor,
      interval: newInterval,
      nextReview: newNextReview,
    },
  });

  return NextResponse.json(
    { message: "The card updated successfully!" },
    { status: 200 }
  );
}

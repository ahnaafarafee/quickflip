import { prisma } from "@/prisma";
import { deckFormSchema } from "@/schema";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId)
    return NextResponse.json(
      { message: "You are not authorize to perform this action." },
      { status: 400 }
    );

  const user = await clerkClient().users.getUser(userId);

  const decks = await prisma.deck.findMany({
    where: { userId: user.publicMetadata.userId as string },
    include: {
      cards: {
        where: {
          nextReview: {
            lte: new Date().toISOString(), // Including today and past dates
          },
        },
      },
      _count: {
        select: { cards: true },
      },
    },
  });

  return NextResponse.json(decks, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId)
    return NextResponse.json(
      { message: "You are not authorize to perform this action." },
      { status: 400 }
    );

  const user = await clerkClient().users.getUser(userId);

  const body = await request.json();
  const validation = deckFormSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const existingName = await prisma.deck.findFirst({
    where: { name: body.name, userId: user.publicMetadata.userId as string },
  });

  if (existingName)
    return NextResponse.json(
      { message: "This name has already been used. Try using different name!" },
      { status: 400 }
    );

  await prisma.deck.create({
    data: {
      name: body.name,
      tags: body.tags,
      userId: user.publicMetadata.userId as string,
    },
  });

  return NextResponse.json(
    { message: "Deck created successfully!" },
    { status: 201 }
  );
}

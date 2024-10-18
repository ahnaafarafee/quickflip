import { prisma } from "@/prisma";
import { deckFormSchema } from "@/schema";
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

  const user = await clerkClient().users.getUser(userId);

  const deck = await prisma.deck.findUnique({
    where: { id: params.id, userId: user.publicMetadata.userId as string },
    include: { cards: true },
  });

  if (!deck)
    return NextResponse.json({ message: "invalid deck" }, { status: 404 });

  return NextResponse.json(deck, { status: 200 });
}

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

  await prisma.deck.update({
    where: { id: params.id },
    data: {
      name: body.name,
      tags: body.tags,
    },
  });

  return NextResponse.json(
    { message: "Deck updated successfully!" },
    { status: 200 }
  );
}

export async function DELETE(
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

  const deck = await prisma.deck.delete({
    where: { id: params.id, userId: user.publicMetadata.userId as string },
  });

  if (!deck)
    return NextResponse.json({ message: "invalid deck" }, { status: 404 });

  return NextResponse.json("deck deleted successfully", { status: 200 });
}

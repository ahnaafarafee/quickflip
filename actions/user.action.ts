import { prisma } from "@/prisma";

export async function createUser(user: any) {
  try {
    const newUser = await prisma.user.create({ data: user });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await prisma.user.delete({
      where: { clerkId: clerkId },
    });
  } catch (error) {
    console.log(error);
  }
}

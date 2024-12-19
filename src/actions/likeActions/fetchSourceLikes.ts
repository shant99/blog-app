"use server";

import { prisma } from "@/lib/prisma";

export default async function fetchSourceLikes(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });
  return sourceList.map((x) => x.targetMember);
}

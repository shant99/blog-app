"use server";

import { prisma } from "@/lib/prisma";

export default async function fetchMutualLikes(userId: string) {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });
  const likedIds = likedUsers.map((x) => x.targetUserId);

  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((x) => x.sourceMember);
}

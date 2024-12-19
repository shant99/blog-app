"use server";

import { prisma } from "@/lib/prisma";
import getAuthUserId from "../authActions/getAuthUserId";

export default async function toggleLikeMember(
  targetUserId: string,
  isLiked: boolean
) {
  try {
    const userId = await getAuthUserId();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

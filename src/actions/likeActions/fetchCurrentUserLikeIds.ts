import { prisma } from "@/lib/prisma";
import getAuthUserId from "../authActions/getAuthUserId";

export default async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

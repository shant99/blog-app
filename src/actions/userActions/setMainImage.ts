"use server";

import { prisma } from "@/lib/prisma";
import { Photo } from "@prisma/client";
import getAuthUserId from "../authActions/getAuthUserId";

export async function setMainImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();

    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });

    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

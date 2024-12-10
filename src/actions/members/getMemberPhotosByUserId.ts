"use server";

import { prisma } from "@/lib/prisma";
import { Photo } from "@prisma/client";

export async function getMemberPhotosByUserId(userId: string) {
  const member = await prisma.member.findUnique({
    where: { userId },
    select: { photos: true },
  });

  if (!member) return null;

  return member.photos.map((p) => p) as Photo[];
}

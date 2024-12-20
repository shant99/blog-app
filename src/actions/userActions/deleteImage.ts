"use server";

import { prisma } from "@/lib/prisma";
import getAuthUserId from "../authActions/getAuthUserId";
import { Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();

    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

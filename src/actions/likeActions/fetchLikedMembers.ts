"use server";

import getAuthUserId from "../authActions/getAuthUserId";
import fetchMutualLikes from "./fetchMutualLikes";
import fetchSourceLikes from "./fetchSourceLikes";
import fetchTargetLikes from "./fetchTargetLikes";

export async function fetchLikedMembers(type = "source") {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

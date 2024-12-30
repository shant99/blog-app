"use server";

import { prisma } from "@/lib/prisma";
import getAuthUserId from "../authActions/getAuthUserId";
import mapMessageToMessageDTO from "@/utils/DTO/mapMessageToMessageDTO";

export default async function getMessagesByContainer(container: string) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });

    console.log(messages, "ssss");

    return messages.map((message) => mapMessageToMessageDTO(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

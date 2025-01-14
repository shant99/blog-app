"use server";

import { prisma } from "@/lib/prisma";
import getAuthUserId from "../authActions/getAuthUserId";
import { messageSelect } from "./helpers";
import mapMessageToMessageDTO from "@/utils/DTO/mapMessageToMessageDTO";

export async function getMessagesByContainer(
  container?: string | null,
  cursor?: string,
  limit = 2
) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { created: { lte: new Date(cursor) } } : {}),
      },
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
      take: limit + 1,
    });

    let nextCursor: string | undefined;

    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.created.toISOString();
    } else {
      nextCursor = undefined;
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDTO(message)
    );

    return { messages: messagesToReturn, nextCursor };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

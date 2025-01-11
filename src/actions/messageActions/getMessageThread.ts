"use server";

import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import createChatId from "@/utils/strings/createChatId";
import getAuthUserId from "../authActions/getAuthUserId";
import mapMessageToMessageDTO from "@/utils/DTO/mapMessageToMessageDTO";
import { messageSelect } from "./helpers";

export default async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
    });

    let readCount = 0;

    if (messages.length > 0) {
      const unreadMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: { dateRead: new Date() },
      });

      readCount = unreadMessageIds.length;

      await pusherServer.trigger(
        createChatId(recipientId, userId),
        "messages:read",
        unreadMessageIds
      );
    }

    return {
      messages: messages.map((message) => mapMessageToMessageDTO(message)),
      readCount,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

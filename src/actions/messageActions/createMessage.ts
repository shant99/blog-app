"use server";

import { prisma } from "@/lib/prisma";
import { MessageSchema, messageSchema } from "@/lib/schemas/MessageSchemas";
import { ActionResult, MessageDto } from "@/types";
import getAuthUserId from "../authActions/getAuthUserId";
import mapMessageToMessageDTO from "@/utils/DTO/mapMessageToMessageDTO";
import { pusherServer } from "@/lib/pusher";
import createChatId from "@/utils/strings/createChatId";
import { messageSelect } from "./helpers";

export default async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
      select: messageSelect,
    });
    const messageDto = mapMessageToMessageDTO(message);

    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      "message:new",
      messageDto
    );
    await pusherServer.trigger(
      `private-${recipientUserId}`,
      "message:new",
      messageDto
    );

    return { status: "success", data: messageDto };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

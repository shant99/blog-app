import getAuthUserId from "@/actions/authActions/getAuthUserId";
import getMessageThread from "@/actions/messageActions/getMessageThread";
import CardInnerWrapper from "@/components/shared/CardInnerWrapper";
import MessageList from "@/components/shared/MessageList";
import createChatId from "@/utils/strings/createChatId";
import ChatForm from "./ChatForm";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId: userIdParam } = await params;
  const messages = await getMessageThread(userIdParam);
  const userId = await getAuthUserId();

  const chatId = createChatId(userId, userIdParam);

  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={userId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
}

"use server";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React, { ReactNode } from "react";
import ClientProvider from "./ClientProvider";
import { auth } from "@/auth";
import getUnreadMessageCount from "@/actions/messageActions/getUnreadMessagesCount";

export default async function Providers({ children }: { children: ReactNode }) {
  const messages = await getMessages();
  const session = await auth();
  const userId = session?.user?.id || null;
  const unreadMessageCount = await getUnreadMessageCount();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextUIProvider>
        <SessionProvider>
          <ClientProvider
            userId={userId}
            unreadMessageCount={unreadMessageCount}
          >
            {children}
          </ClientProvider>
        </SessionProvider>
      </NextUIProvider>
    </NextIntlClientProvider>
  );
}

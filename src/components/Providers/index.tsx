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
  const unreadMessageCount = userId ? await getUnreadMessageCount() : 0;

  return (
    <NextIntlClientProvider messages={messages}>
      <NextUIProvider>
        <SessionProvider>
          {userId ? (
            <ClientProvider
              userId={userId}
              unreadMessageCount={unreadMessageCount}
            >
              {children}
            </ClientProvider>
          ) : (
            children
          )}
        </SessionProvider>
      </NextUIProvider>
    </NextIntlClientProvider>
  );
}

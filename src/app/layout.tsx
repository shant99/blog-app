import type { Metadata } from "next";
import Providers from "@/components/Providers";
import TopNav from "@/components/shared/NavBar";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { getLocale } from "next-intl/server";
import "../styles/globals.css";
import { bodyClass } from "./helpers";
import { IRootLayout } from "@/types/global";

export default async function RootLayout({ children }: IRootLayout) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={bodyClass}>
        <Providers>
          <TopNav />
          <main>{children}</main>
          <footer>
            <LanguageSwitcher />
          </footer>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "This is Blog app",
  icons: {
    icon: "/favicon.ico",
  },
};

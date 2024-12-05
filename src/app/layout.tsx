import type { Metadata } from "next";
import Providers from "@/components/Providers";
import TopNav from "@/components/shared/NavBar";
import { getLocale } from "next-intl/server";
import { IRootLayout } from "@/types/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/shared/Footer";
import { geistSans, geistMono } from "@/assets/fonts";
import "../styles/globals.css";
import clsx from "clsx";

const bodyClass = clsx(geistSans.variable, geistMono.variable);

export default async function RootLayout({ children }: IRootLayout) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={bodyClass}>
        <Providers>
          <ToastContainer position="bottom-right" />
          <TopNav />
          <main>{children}</main>
          <Footer />
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

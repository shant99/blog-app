import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";
import { geistSans, geistMono } from "@/assets/fonts";
import clsx from "clsx";

const bodyClass = clsx(geistSans.variable, geistMono.variable);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={bodyClass}>
        <Providers>
          <div className="wrapper-base">
            <main>{children}</main>
            <footer>Footer</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "This is Blog app",
};

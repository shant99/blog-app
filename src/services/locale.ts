"use server";
import { cookies } from "next/headers";

// const isProduction = process.env.NODE_ENV === "production";
const COOKIE_NAME = "NEXT_LOCALE";

export async function getLocaleCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || "en";
}

export async function setLocaleCookie(value: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIE_NAME,
    value,
    path: "/",
    maxAge: 31536000,
    secure: false, //isProduction, production-i jamanak petqa
  });
}

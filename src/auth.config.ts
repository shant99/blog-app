import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import { loginSchema } from "./lib/schemas/LoginSchema";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          const comparedPassword = await compare(
            password,
            user.passwordHash || ""
          );

          if (comparedPassword) {
            return user;
          }
          return null;
        }

        return null;
      },
    }),
  ],
  pages: {
    newUser: "/welcome",
    signIn: "/login",
    signOut: "/login",
    error: "/error",
    // verifyRequest: "/auth/verify", // Страница для проверки email
  },
} satisfies NextAuthConfig;

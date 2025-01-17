import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import bcrypt from "bcryptjs";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: RegisterSchema) {
  const { name, email, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

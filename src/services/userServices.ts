import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { TRegisterSchema } from "@/lib/schemas/RegisterSchema";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: TRegisterSchema) {
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

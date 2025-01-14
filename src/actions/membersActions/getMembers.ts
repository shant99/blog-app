"use server";

import { prisma } from "@/lib/prisma";
import { GetMemberParams, PaginatedResponse } from "@/types";
import getAuthUserId from "../authActions/getAuthUserId";
import { Member } from "@prisma/client";
import getAgeRange from "@/utils/dates/getAgeRange";

export async function getMembers({
  ageRange = "18,100",
  gender = "male,female",
  orderBy = "updated",
  pageNumber = "1",
  pageSize = "12",
  withPhoto = "true",
}: GetMemberParams): Promise<PaginatedResponse<Member>> {
  const userId = await getAuthUserId();

  const [minDob, maxDob] = getAgeRange(ageRange);

  const selectedGender = gender.split(",");

  const page = parseInt(pageNumber);
  const limit = parseInt(pageSize);

  const skip = (page - 1) * limit;

  try {
    const membersSelect = {
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          ...(withPhoto === "true" ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId,
        },
      },
    };

    const count = await prisma.member.count(membersSelect);

    const members = await prisma.member.findMany({
      ...membersSelect,
      orderBy: { [orderBy]: "desc" },
      skip,
      take: limit,
    });

    return {
      items: members,
      totalCount: count,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

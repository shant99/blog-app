import { Member } from "@prisma/client";

export type LikesTabProps = {
  members: Member[];
  likeIds: string[];
  defaultType: string;
};

import { Divider } from "@nextui-org/react";
import React from "react";

import getAuthUserId from "@/actions/authActions/getAuthUserId";
import { getMemberByUserId } from "@/actions/membersActions/getMemberByUserId";
import { getMemberPhotosByUserId } from "@/actions/membersActions/getMemberPhotosByUserId";
import MemberPhotos from "@/components/shared/MemberPhotos";
import MemberPhotoUpload from "@/components/shared/MemberPhotoUpload";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-default">Edit Profile</div>
      </div>
      <Divider />
      <div>
        <MemberPhotoUpload />
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </div>
    </>
  );
}

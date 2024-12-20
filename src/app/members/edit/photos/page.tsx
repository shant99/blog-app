import { CardHeader, Divider, CardBody } from "@nextui-org/react";
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
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-default">Edit Profile</div>
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
}

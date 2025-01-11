import { getMemberPhotosByUserId } from "@/actions/membersActions/getMemberPhotosByUserId";
import { Divider, Image } from "@nextui-org/react";
import React from "react";

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <div className="text-2xl font-semibold text-default">Photos</div>
      <Divider />
      <div>
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  src={photo.url}
                  alt="Image of member"
                  className="object-cover aspect-square"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

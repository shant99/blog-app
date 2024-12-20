"use client";

import { addImage } from "@/actions/userActions/addImage";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import ImageUploadButton from "../ImageUploadButton";

export default function MemberPhotoUpload() {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };
  return (
    <div>
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
}

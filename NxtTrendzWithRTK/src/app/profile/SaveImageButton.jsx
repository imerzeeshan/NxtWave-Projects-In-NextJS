import { updateCredentials } from "@/features/authSlice";
import { useDeleteImageKitImageMutation } from "@/features/imageKitApiSlice";
import { useUpdateProfileMutation } from "@/features/profileApiSlice";
import { upload } from "@imagekit/next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SaveImageButton = ({ setChangeProfile, file }) => {
  const dispatch = useDispatch();
  const [deleteImageKitImage] = useDeleteImageKitImageMutation();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [isSaving, setIsSaving] = useState(false);

  const handleSavefile = async () => {
    setIsSaving(true);
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const uploadImgRes = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
      });

      const { url, thumbnailUrl, fileId } = uploadImgRes;
      if (!url || !thumbnailUrl || !fileId) {
        return;
      }

      const res = await updateProfile({
        fileId,
        url,
        thumbnailUrl,
        action: "upload",
      }).unwrap();
      console.log(res);

      if (!res.success) {
        await deleteImageKitImage({ fileId });
      }
      dispatch(updateCredentials(res));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
      setChangeProfile(false);
    }
  };
  return (
    <button
      onClick={handleSavefile}
      disabled={isSaving || isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer 
              transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {isSaving || isLoading ? "Saving..." : "Save"}
    </button>
  );
};

export default SaveImageButton;

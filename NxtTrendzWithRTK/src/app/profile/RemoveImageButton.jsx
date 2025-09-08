import { updateCredentials } from "@/features/authSlice";
import { useDeleteImageKitImageMutation } from "@/features/imageKitApiSlice";
import { useUpdateProfileMutation } from "@/features/profileApiSlice";
import React from "react";
import { useDispatch } from "react-redux";

const RemoveImageButton = ({ fileId, setChangeProfile, setPreview }) => {
  const dispatch = useDispatch();
  const [deleteImageKitImage, { isLoading }] = useDeleteImageKitImageMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const handleDeleteImage = async (fileId) => {
    if (!fileId) {
      console.warn("No fileId provided, skipping delete");
      return;
    }
    try {
      const res = await deleteImageKitImage({ fileId }).unwrap();
      console.log(res);

      if (res.success) {
        const data = await updateProfile({ action: "remove" }).unwrap();
        setPreview("");
        // const data = await res.json();
        console.log(data);

        // await refreshSession();
        dispatch(updateCredentials(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setChangeProfile(false);
    }
  };
  return (
    <button
      onClick={() => handleDeleteImage(fileId)}
      disabled={isLoading}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer 
              transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {isLoading ? "Removing..." : "Remove"}
    </button>
  );
};

export default RemoveImageButton;

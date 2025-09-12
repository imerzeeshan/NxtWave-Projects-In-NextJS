"use client"; //! This component must be a client component
import { upload } from "@imagekit/next";
import { useState } from "react";

const FileUpload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);



  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(file);


    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      console.log(auth);

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
      });

      console.log(res);
      // onSuccess(res);
    } catch (error) {
      console.error("Upload Failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading</span>} */}
      <div
        className="flex items-center space-y-4 bg-gray-400/20 gap-2 mb-2 rounded h-20 border 
      border-dashed border-gray-400 p-1 text-center hover:bg-gray-100 transition"
      >
        <label className="w-full h-full flex items-center justify-center mb-0 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-gray-600">Click to upload image</span>
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="ml-auto max-h-full object-cover rounded"
          />
        )}
      </div>
    </>
  );
};

export default FileUpload;

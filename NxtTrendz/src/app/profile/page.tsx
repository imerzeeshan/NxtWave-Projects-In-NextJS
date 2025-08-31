"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { upload } from "@imagekit/next";

const ProfilePage = () => {
  const { user, refreshSession } = useAppContext();
  const [changeProfile, setChangeProfile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFile(file);
    }
  };

  const handleDeleteImage = async (fileId: string) => {
    setIsRemoving(true);
    try {
      const deleteImgRes = await fetch("/api/auth/imagekit-auth", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });

      if (deleteImgRes.ok) {
        const res = await fetch("/api/user/profile", {
          method: "PUT",
        });
        setPreview("");
        await refreshSession();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRemoving(false);
      setChangeProfile(false);
    }
  };

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
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
      });

      const { url, thumbnailUrl, fileId } = uploadImgRes;
      if (!url || !thumbnailUrl || !fileId) {
        return;
      }

      const updateRes = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, url, thumbnailUrl }),
      });
      if (!updateRes.ok) {
        handleDeleteImage(fileId);
      }
      await refreshSession();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
      setChangeProfile(false);
    }
  };

  return (
    <div className="pt-25 bg-gray-900 min-h-screen text-white">
      <h1>Profile Page</h1>
      <div className="flex justify-between">
        <Link href={"/order"}>My Orders</Link>
        <button className="px-3 py-2 bg-gray-600/60 rounded cursor-pointer">
          Become Seller
        </button>

        <button className="flex justify-between items-center px-3 py-2 bg-gray-600/60 rounded">
          Edit Profile <Pencil />
        </button>
      </div>
      <div className="bg-red-500">
        <div className="relative">
          <Image
            src={user?.image?.url || "/images/placeholder.jpg"}
            alt="profile img"
            height={200}
            width={200}
            priority
            className="rounded-full"
          />
          <div className="bg-amber-50/20 rounded-full p-2 absolute flex top-20 left-20 cursor-pointer">
            <Pencil
              onClick={() => setChangeProfile(true)}
              className="opacity-50"
            />
          </div>
        </div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </div>
      {changeProfile && (
        <div className="h-screen w-screen bg-gray-500/50 absolute top-0 pt-25">
          <div className="bg-gray-300/80 relative text-black w-xl h-[300px] flex flex-col items-center mx-auto justify-center">
            <X
              onClick={() => setChangeProfile(false)}
              className="absolute right-2 top-2 bg-white rounded-full text-gray-500 cursor-pointer"
            />
            <Image
              src={preview || user?.image?.url || "/images/placeholder.jpg"}
              alt="profile img"
              height={200}
              width={200}
              priority
              className="rounded-full"
            />
            <div className="absolute top-24 bg-gray-50/40 rounded-full p-3 cursor-pointer">
              <Pencil className="text-white cursor-pointer h-6 w-6" />
            </div>
            <input
              type="file"
              accept="image/*"
              name="profile-image"
              onChange={handlefile}
              className="cursor-pointer top-24 z-50 absolute h-12 w-12 opacity-0 bg-white rounded-full"
            />
            <div className="flex gap-5 mt-5">
              {user?.image?.fileId && (
                <button
                  onClick={() => handleDeleteImage(user?.image?.fileId!)}
                  disabled={isRemoving || isSaving}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer 
              transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isRemoving ? "Removing..." : "Remove"}
                </button>
              )}
              <button
                onClick={handleSavefile}
                disabled={isRemoving || isSaving}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer 
              transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

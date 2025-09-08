"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { useSelector } from "react-redux";
import RemoveImageButton from "./RemoveImageButton";
import SaveImageButton from "./SaveImageButton";
import Loading from "../loading";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  const [changeProfile, setChangeProfile] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  console.log({ user });

  const handlefile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFile(file);
    }
  };

  const handleBecomeSeller = async () => {
    try {
      const res = await fetch("/api/user/user-data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "requested" }),
      });
      if (res.ok) {
        alert("Requested Successfully For Becoming a Seller");
      }
      console.log(await res.json());
    } catch (error) {
      console.warn(error);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto pt-16 bg-gray-900 min-h-screen text-white px-5">
      <h1 className="text-2xl font-semibold p-2 pl-6">Profile</h1>
      <div className="flex flex-col items-start mb-2">
        <Link
          href={"/order"}
          className="text-xs font-bold hover:bg-gray-100/20 px-1 py-1"
        >
          My Orders
        </Link>
        {user.role === "user" && (
          <button
            onClick={handleBecomeSeller}
            className=" text-xs font-bold cursor-pointer hover:bg-gray-100/20 px-1 py-1"
          >
            Become Seller
          </button>
        )}

        <button className="text-xs cursor-pointer font-bold hover:bg-gray-100/20 px-1 py-1">
          Edit Profile
        </button>
      </div>
      <div className="bg-gray-500/20 p-5 rounded flex flex-col md:flex-row gap-5">
        <div className="relative">
          <Image
            src={user?.image?.url || "/images/placeholder.jpg"}
            alt="profile img"
            height={200}
            width={200}
            priority
            className="rounded-full w-[200px] h-[200px]"
          />
          <div className="bg-amber-50/20 rounded-full p-2 absolute flex top-20 left-20 cursor-pointer">
            <Pencil
              onClick={() => setChangeProfile(true)}
              className="opacity-50"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="font-semibold">Email: {user?.email}</p>
          <p className="">Phone: {user?.phone}</p>
          <div className="flex gap-2 items-center">
            Role:
            {user.role === "requested" ? (
              <p className="text-xs font-bold">
                Your seller request is pending approval.
              </p>
            ) : (
              <p>{user.role}</p>
            )}
          </div>
          <p>
            Member Since:{" "}
            {new Date(user.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p>Bio: </p>
          <p>Address: </p>
        </div>
      </div>
      {changeProfile && (
        <div className="h-screen w-screen bg-gray-500/50 absolute top-0 pt-25">
          <div className="bg-gray-300/80 relative text-black w-xl h-[300px] flex flex-col items-center mx-auto justify-center">
            <X
              onClick={() => {
                setPreview("");
                setChangeProfile(false);
              }}
              className="absolute right-2 top-2 bg-white rounded-full text-gray-500 cursor-pointer"
            />
            <Image
              src={preview || user?.image?.url || "/images/placeholder.jpg"}
              alt="profile img"
              height={200}
              width={200}
              priority
              className="rounded-full w-[200px] h-[200px]"
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
                <RemoveImageButton
                  fileId={user?.image?.fileId}
                  setChangeProfile={setChangeProfile}
                  setPreview={setPreview}
                />
              )}
              <SaveImageButton
                setChangeProfile={setChangeProfile}
                file={file}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

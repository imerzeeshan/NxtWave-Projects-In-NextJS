"use client";
import { NUser } from "@/models/User";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { setRole } from "./action";

const UserDetails = ({
  user,
  index,
  setIsUpdated,
  isUpdated,
}: {
  user: NUser;
  index: number;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentRole = user.role;

  const handleRoleChange = async (role: string) => {
    setIsOpen(false);
    const formData = new FormData();
    formData.append("id", user._id.toString());
    formData.append("role", role);
    await setRole(formData);
    setIsUpdated(!isUpdated);
  };

  const handleRemoveRole = async () => {};
  return (
    <>
      <td className="px-4 py-2 border-b">{index + 1}</td>
      <td className="px-4 py-2 border-b">{user.name}</td>
      <td className="px-4 py-2 border-b">{user.email}</td>
      <td className="px-4 py-2 border-b">{user.role}</td>
      <td className="px-4 py-2 border-b ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-3 py-1.5 text-sm font-medium text-gray-700 
        dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md border border-gray-300
         dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
        >
          Actions <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
        </button>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              <button
                onClick={() => handleRoleChange("admin")}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  currentRole === "admin"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Make Admin
              </button>
              <button
                onClick={() => handleRoleChange("seller")}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  currentRole === "seller"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Make Seller
              </button>
              <button
                onClick={() => handleRoleChange("moderator")}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  currentRole === "user"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Make User
              </button>
              <button
                onClick={handleRemoveRole}
                className="block px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Remove Seller Role
              </button>
            </div>
          </div>
        )}
      </td>
    </>
  );
};

export default UserDetails;

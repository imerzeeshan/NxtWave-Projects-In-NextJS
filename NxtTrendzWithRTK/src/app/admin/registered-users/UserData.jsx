"use client";

import { NUser } from "@/models/User";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const UserData = () => {
  const [allUser, setAllUser] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  console.log(allUser, isUpdated);

  const getAllUsers = async () => {
    const res = await fetch("/api/user/user-data", { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      setAllUser(data.allUsers);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [isUpdated]);
  return (
    <div>
      <h1>UserData</h1>
      <table className="min-w-full border border-gray-700 text-sm text-left text-gray-800">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">S.No.</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((user, index) => (
            <tr key={user._id.toString()} className="hover:bg-gray-200">
              <UserDetails
                index={index}
                user={user}
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;

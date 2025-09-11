"use client";

import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const UserData = () => {
  const [allUser, setAllUser] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  console.table(allUser);

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
    <div className="space-y-6 my-6 flex flex-col items-center">
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-2 underline">All Requested Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-max table-auto border border-gray-700 text-sm text-left text-gray-800">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[80px]">
                  S.No.
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Name
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[200px]">
                  Email
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[120px]">
                  Role
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser?.map((user, index) => {
                return (
                  user.role === "requested" && (
                    <tr key={user._id.toString()} className="hover:bg-gray-200">
                      <UserDetails
                        index={index}
                        user={user}
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                      />
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-2 underline">
          All Registered Users
        </h2>
        <div className="overflow-x-auto">
          <table className=" border border-gray-700 text-sm text-left text-gray-800">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[80px]">
                  S.No.
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Name
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[200px]">
                  Email
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[120px]">
                  Role
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Action
                </th>
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
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-2 underline">All Admins</h2>
        <div className="overflow-x-auto">
          <table className="min-w-max table-auto border border-gray-700 text-sm text-left text-gray-800">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[80px]">
                  S.No.
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Name
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[200px]">
                  Email
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[120px]">
                  Role
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser?.map((user, index) => {
                return (
                  user.role === "admin" && (
                    <tr key={user._id.toString()} className="hover:bg-gray-200">
                      <UserDetails
                        index={index}
                        user={user}
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                      />
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-2 underline">All Sellers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-max table-auto border border-gray-700 text-sm text-left text-gray-800">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[80px]">
                  S.No.
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Name
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[200px]">
                  Email
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[120px]">
                  Role
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser?.map((user, index) => {
                return (
                  user.role === "seller" && (
                    <tr key={user._id.toString()} className="hover:bg-gray-200">
                      <UserDetails
                        index={index}
                        user={user}
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                      />
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-2 underline">All Normal Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-max table-auto border border-gray-700 text-sm text-left text-gray-800">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[80px]">
                  S.No.
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Name
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[200px]">
                  Email
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[120px]">
                  Role
                </th>
                <th className="px-4 py-2 border-b whitespace-nowrap min-w-[150px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser?.map((user, index) => {
                return (
                  user.role === "user" && (
                    <tr key={user._id.toString()} className="hover:bg-gray-200">
                      <UserDetails
                        index={index}
                        user={user}
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                      />
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserData;

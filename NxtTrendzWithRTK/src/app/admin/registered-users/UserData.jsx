"use client";

import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import Loading from "@/app/loading";

const UserData = () => {
  const [allUser, setAllUser] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/user/user-data", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setAllUser(data.allUsers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [isUpdated]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="space-y-10 my-6 flex flex-col items-center">
      <UserTable
        title="All Requested Users"
        users={allUser}
        filterRole="requested"
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
      <UserTable
        title="All Registered Users"
        users={allUser}
        filterRole={null} // shows all
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
      <UserTable
        title="All Admins"
        users={allUser}
        filterRole="admin"
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
      <UserTable
        title="All Sellers"
        users={allUser}
        filterRole="seller"
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
      <UserTable
        title="All Normal Users"
        users={allUser}
        filterRole="user"
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </div>
  );
};

export default UserData;

"use client";
import { useGetAllUsersMutation } from "@/features/userApiSlice";
import { useEffect, useState } from "react";
import Loading from "../loading";

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();
  const getAllUsersFn = async () => {
    try {
      const data = await getAllUsers().unwrap();
      if (data.success) {
        setUsers(data.AllUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsersFn();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="pt-20">
      <h1>Admin Home Page</h1>
      <div>{/* <AdminSideBar /> */}</div>
    </div>
  );
};

export default AdminHomePage;

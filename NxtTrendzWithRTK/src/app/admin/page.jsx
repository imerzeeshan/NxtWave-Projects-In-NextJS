"use client";
import { useGetAllUsersMutation } from "@/features/userApiSlice";
import { useEffect, useState } from "react";
import Loading from "../loading";

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();

  console.log(users);

  const getAllUsersFn = async () => {
    try {
      const data = await getAllUsers().unwrap();
      console.log(data);
      
      if (data.success) {
        setUsers(data.allUsers);
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
    <div className="pt-13 px-6">
      <h1 className="text-3xl font-bold mb-6 text-fuchsia-600">Admin Dashboard</h1>

      {/* 🔹 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{users?.length}</p>
        </div>
        <div className="p-6 bg-green-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Sellers</h2>
          <p className="text-2xl">
            {users?.filter((u) => u.role === "seller").length}
          </p>
        </div>
        <div className="p-6 bg-yellow-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Admins</h2>
          <p className="text-2xl">
            {users?.filter((u) => u.role === "admin").length}
          </p>
        </div>
      </div>

      {/* 🔹 User Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  {new Date(u.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;

"use client";

import UserDetails from "./UserDetails";

const UserTable = ({ title, users, filterRole, isUpdated, setIsUpdated }) => {
  const filteredUsers = filterRole
    ? users.filter((u) => u.role === filterRole)
    : users;

  // Format createdAt to readable date
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mb-10 w-screen">
      <h2 className="text-lg font-bold text-gray-700 mb-2 underline">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y border border-gray-700 text-sm text-left text-gray-800">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="px-4 py-2 border-b min-w-[80px]">S.No.</th>
              <th className="px-4 py-2 border-b min-w-[150px]">Name</th>
              <th className="px-4 py-2 border-b min-w-[200px]">Email</th>
              <th className="px-4 py-2 border-b min-w-[120px]">Role</th>
              <th className="px-4 py-2 border-b min-w-[150px]">Joined</th>
              <th className="px-4 py-2 border-b min-w-[150px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id.toString()} className="hover:bg-gray-200">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-2 border-b">
                  <UserDetails
                    index={index}
                    user={user}
                    isUpdated={isUpdated}
                    setIsUpdated={setIsUpdated}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center p-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;

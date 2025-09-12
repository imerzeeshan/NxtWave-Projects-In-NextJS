import UserData from "./UserData";

const RegisteredUsers = () => {
  return (
    <div className="pt-15 w-full">
      <h1 className="text-xl font-semibold text-gray-800">Registered Users</h1>
      <div className="mr-5">
        <UserData />
      </div>
    </div>
  );
};

export default RegisteredUsers;

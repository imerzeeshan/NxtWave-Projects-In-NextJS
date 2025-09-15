import { updateCredentials } from "@/features/authSlice";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddPhone = ({ setAddPhone }) => {
  const [phone, setPhone] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleAddPhone = async (event) => {
    event.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "phone" }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(updateCredentials(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
      setAddPhone(false);
    }
  };
  return (
    <div className="absolute bg-gray-500/40 w-full h-full top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handleAddPhone}
        className="relative min-h-[200px] bg-white text-gray-400 w-xs flex flex-col justify-center items-center space-y-5"
      >
        <X
          onClick={() => setAddPhone(false)}
          className="absolute top-2 right-2 ring-2 rounded-full cursor-pointer ring-red-200"
        />
        <input
          type="number"
          name="phone"
          placeholder="Ender You Mobile No."
          className="input-no-spinner border-2 rounded px-2 py-1"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-white rounded disabled:cursor-not-allowed
          disabled:bg-gray-400"
        >
          {isAdding ? "Adding" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddPhone;

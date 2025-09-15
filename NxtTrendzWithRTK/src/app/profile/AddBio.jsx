import { updateCredentials } from "@/features/authSlice";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddBio = ({ setAddBio }) => {
  const [bio, setBio] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleAddBio = async (event) => {
    event.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, action: "bio" }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(updateCredentials(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAddBio(false);
      setIsAdding(false);
    }
  };
  return (
    <div className="absolute bg-gray-500/40 w-full h-full top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handleAddBio}
        className="relative w-fit p-10 bg-white text-gray-400 rounded flex flex-col justify-center items-center space-y-5"
      >
        <X
          onClick={() => setAddBio(false)}
          className="absolute top-2 right-2 ring-2 rounded-full cursor-pointer ring-red-200"
        />
        <textarea
          type="text"
          name="bio"
          placeholder="Ender Your Bio."
          className="border-2 rounded px-2 py-1"
          rows={10}
          cols={80}
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-white rounded disabled:cursor-not-allowed
          disabled:bg-gray-400"
        >
          {isAdding ? "Bio Adding" : "Add Bio"}
        </button>
      </form>
    </div>
  );
};

export default AddBio;

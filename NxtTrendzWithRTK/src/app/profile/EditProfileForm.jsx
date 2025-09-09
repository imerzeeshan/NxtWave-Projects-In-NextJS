import { X } from "lucide-react";
import React, { useReducer } from "react";
import { useSelector } from "react-redux";

// const initialState = {
//   name: "",
//   phone: "",
//   bio: "",
//   address: "",
// };

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}

const EditProfileForm = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(reducer, user);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(state);
    
    onClose(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <X
          onClick={() => onClose(false)}
          className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-black"
        />
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={(e) => dispatch({ field: "name", value: e.target.value })}
            placeholder="Full Name"
            className="px-3 py-2 border rounded w-full"
          />
          <input
            type="text"
            name="phone"
            value={state.phone}
            onChange={(e) =>
              dispatch({ field: "phone", value: e.target.value })
            }
            placeholder="Phone Number"
            className="px-3 py-2 border rounded w-full"
          />
          <textarea
            name="bio"
            value={state.bio}
            onChange={(e) => dispatch({ field: "bio", value: e.target.value })}
            placeholder="Your Bio"
            rows={3}
            className="px-3 py-2 border rounded w-full"
          />
          <textarea
            name="address"
            value={state.address}
            onChange={(e) =>
              dispatch({ field: "address", value: e.target.value })
            }
            placeholder="Your Address"
            rows={2}
            className="px-3 py-2 border rounded w-full"
          />
          <button
            type="submit"
            disabled={false}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 disabled:opacity-50"
          >
            {false ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

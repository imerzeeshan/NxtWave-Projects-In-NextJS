import React from "react";

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-lg text-white font-medium transition
              ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default SubmitButton;

import React from "react";

const SubmitButton = ({ isLoading }) => {
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
        disabled={isLoading}
      >
        {isLoading ? "Logging..." : "Login"}
      </button>
    </div>
  );
};

export default SubmitButton;

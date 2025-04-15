import React from "react";
import { Users } from "lucide-react";
import Link from "next/link";

// Assuming you have a routes constant or configuration
const ROUTES = {
  USERS_MANAGEMENT: "/admin",
};

const UsersManagementCard = () => {
  return (
    <div className="bg-black p-6 rounded-lg w-full max-w-sm border border-stone-600 shadow-lg flex flex-col items-center">
      <div className="bg-gray-800 rounded-full p-3 mb-2">
        <Users className="text-gray-400 w-6 h-6" />
      </div>
      <div className="text-center mb-4">
        <h2 className="text-white font-bold text-xl">Users</h2>
        <p className="font-bold text-gray-400 text-lg">Manage system users</p>
      </div>
      <Link
        href={ROUTES.USERS_MANAGEMENT}
        className="w-full flex justify-center"
        aria-label="Go to User Management"
      >
        <button className="bg-purple-600 hover:bg-purple-700 h-12 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center">
          Go to Users
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default UsersManagementCard;

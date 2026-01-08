"use client";

import { LuMenu } from "react-icons/lu";

export default function TopBar({ onMenuClick }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
      {/* Mobile menu */}
      <div className="flex md:hidden w-full">
        <button onClick={onMenuClick}>
          <LuMenu size={30} className="text-purple-500" />
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800">Task Overview</h2>
        <p className="text-sm text-gray-500">Manage your tasks efficiently</p>
      </div>

      <button className="w-full md:w-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
        + Add New Task
      </button>
    </div>
  );
}

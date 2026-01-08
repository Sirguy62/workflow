"use client";

import { IoMdClose } from "react-icons/io";

export default function MobileSidebar({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40 md:block lg:hidden"
      />

      {/* Sidebar */}
      <aside
        className="
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-white border-r
          px-5 py-6
          transition-transform duration-300
          lg:hidden
           mt-16
        "
      >
        {/* <h1 className="text-xl font-bold text-purple-600 mb-6">⚡ Taskflow</h1> */}

        <nav className="space-y-3">
          <button className="w-full text-left px-3 py-2 rounded bg-purple-50 text-purple-600">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 text-gray-600">
            Pending Tasks
          </button>
          <button className="w-full text-left px-3 py-2 text-gray-600">
            Completed Tasks
          </button>
        </nav>

        {/* <div className="mt-10 p-4 rounded-xl bg-purple-50 text-sm text-purple-600">
          💡 Use keyboard shortcuts to boost productivity
        </div> */}
      </aside>
    </>
  );
}

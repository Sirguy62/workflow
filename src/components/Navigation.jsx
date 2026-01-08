"use client";

import Link from "next/link";
import { MdWorkHistory } from "react-icons/md";
import { FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { signOut } from "@/lib/actions/auth-actions";
import { usePathname, useRouter } from "next/navigation";


export default function Navigation({ session }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);


  const name = session?.user?.name || "User";
  const initial = name.charAt(0).toUpperCase();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleSignOut = async () => {
     await signOut();
     setOpen(false);
   };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="relative flex items-center gap-2">
          <MdWorkHistory size={40} className="text-purple-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            WorkFlow
          </span>
          <div className="absolute left-[34px] top-[34px]">
            <div className="relative">
              <span
                className="
      absolute -bottom-1 -right-1
      w-4 h-4
      bg-white
      rounded-full
       animate-[ping_0.8s_ease-in-out_infinite]
    
    "
              />
              {/* <span
                className="
      absolute -bottom-1 -right-1
      w-3 h-3
      bg-white
      rounded-full
      shadow-md
    "
              /> */}
            </div>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* {session && (
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link>
          )} */}

          {!session && (
            <Link href="/auth" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
          )}

          {/* User Menu */}
          {session && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
                    {initial}
                  </div>
                  <span
                    className="
  absolute bottom-0 right-0
  w-3 h-3
  bg-green-500
  border-2 border-white
  rounded-full
  animate-pulse
"
                  />
                </div>
                <FiChevronDown className="text-gray-500" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-800">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500">Signed in</p>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    <FiSettings />
                    Profile Settings
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

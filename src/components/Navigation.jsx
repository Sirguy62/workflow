"use client";



import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ session }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold text-gray-900">
              Better-Auth Demo
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={
                isActive("/")
                  ? "text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md"
                  : "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Home
            </Link>

            {session && (
              <Link
                href="/dashboard"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Dashboard
              </Link>
            )}

            {!session && (
              <Link
                href="/auth"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

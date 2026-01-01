import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-1 bg-linear-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
            Bookora
          </h1>
          <span className="block text-white text-md my-1">Your Travel Starts Here</span>
          <div className="flex justify-center mt-5 space-x-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Profile
            </Link>
            <Link
              href="/hotels"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Hotel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer

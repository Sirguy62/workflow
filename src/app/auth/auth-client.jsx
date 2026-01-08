"use client";

import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEyeOff,
  FiArrowRight,
  FiUserPlus,
  FiUser,
  FiGithub,
} from "react-icons/fi";
import { signIn, signUp, signInSocial } from "@/lib/actions/auth-actions";

export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignIn) {
        const res = await signIn(email, password);
        if (!res?.user) {
          setError("Invalid email or password");
        }
      } else {
        const res = await signUp(email, password, name);
        if (!res?.user) {
          setError("Failed to create account");
        }
      }
      // ✅ redirect handled on server
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGitHub() {
    setLoading(true);
    setError("");
    try {
      await signInSocial("github");
      // redirect handled server-side
    } catch {
      setError("GitHub authentication failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-5 md:px-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl">
            {isSignIn ? <FiArrowRight /> : <FiUserPlus />}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl text-gray-600 font-bold text-center">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-gray-700 mt-1 mb-6">
          {isSignIn
            ? "Sign in to continue to TaskFlow"
            : "Join TaskFlow to manage your tasks"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-purple-500" />
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 text-gray-700 pr-3 py-3 border border-purple-300/40 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-purple-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-gray-700 border-purple-300/40 pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-purple-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-gray-700 border-purple-300/40 pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <FiEyeOff className="absolute right-3 top-3.5 text-gray-400" />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isSignIn ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* OAuth */}
        <div className="mt-4">
          <button
            onClick={handleGitHub}
            disabled={loading}
            className="w-full py-3 rounded-lg border text-gray-700 border-purple-300/40 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FiGithub />
            Continue with GitHub
          </button>
        </div>

        {/* Toggle */}
        <p className="text-center text-gray-600 text-sm mt-6">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-purple-600 font-medium"
          >
            {isSignIn ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signInSocial, signUp } from "@/lib/actions/auth-actions";

export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setError("");

    try {
      await signInSocial(provider);
    } catch (err) {
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignIn) {
        const result = await signIn(email, password);
        if (!result?.user) setError("Invalid credentials");
      } else {
        const result = await signUp(email, password, name);
        if (!result?.user) setError("Failed to create account");
      }
    } catch {
      setError("Authentication error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleEmailAuth}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold">
          {isSignIn ? "Sign In" : "Create Account"}
        </h1>

        {!isSignIn && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 w-full rounded"
        >
          {isLoading ? "Loading..." : isSignIn ? "Sign In" : "Create Account"}
        </button>

        <button
          type="button"
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-sm underline"
        >
          {isSignIn
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>

        <hr />

        <button
          type="button"
          onClick={() => handleSocialAuth("github")}
          className="border py-2 w-full"
        >
          Continue with GitHub
        </button>
      </form>
    </div>
  );

}

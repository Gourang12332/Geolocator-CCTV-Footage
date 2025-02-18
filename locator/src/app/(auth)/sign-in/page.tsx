"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false, // Don't redirect automatically
      username,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Redirect to the dashboard after successful login
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-800 text-white p-6 border-black">
      <div className="bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md w-full backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-l transform transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

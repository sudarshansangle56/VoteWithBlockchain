import React, { useState } from "react";

function Login() {
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { voterId, password });
    // later add API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          E-Voting Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Voter ID / Aadhaar */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">
              Voter ID / Aadhaar
            </label>
            <input
              type="text"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your Voter ID or Aadhaar"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-green-600 font-medium hover:underline">
              Register
            </a>
          </p>
          <p className="mt-2">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

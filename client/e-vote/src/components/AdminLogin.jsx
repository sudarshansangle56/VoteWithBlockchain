import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdminAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      setIsAdminAuthenticated(true);
      navigate("/admin");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

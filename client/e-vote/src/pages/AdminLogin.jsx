import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, LogIn, LogOut } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/login", formData);
      setLoading(false);

      if (res.data.success) {
        // ✅ Save token and admin flag
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("isAdmin", "true");

        alert("Login successful!");
        window.location.href = "/admin"; // ✅ Redirect to admin panel
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      alert("Invalid credentials");
      console.error(err);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    alert("Logged out successfully!");
    window.location.reload(); // reloads to show login page cleared
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 relative">

      {/* 🔹 Logout Button (top-right) */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>

      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-3">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <p className="text-gray-600 text-sm mt-1">Sign in to manage the platform</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50"
          >
            <span>{loading ? "Logging in..." : "Login"}</span>
            <LogIn className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/admin/register", formData);
      setLoading(false);

      if (res.data.success) {
        alert("Admin Registered Successfully! Redirecting to Login...");
        window.location.href = "/admin-login";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Error registering admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-3">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Registration
          </h2>
          <p className="text-gray-600 text-sm mt-1">Create an account to manage elections</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" name="name" placeholder="Full Name" value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" name="email" placeholder="Email" value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password"
              value={formData.password} onChange={handleChange}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password"
              value={formData.confirmPassword} onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" required />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50">
            <span>{loading ? "Registering..." : "Register as Admin"}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;

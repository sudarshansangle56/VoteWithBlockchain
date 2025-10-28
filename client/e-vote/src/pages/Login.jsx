import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Fingerprint,
  Camera,
  LogIn,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    aadhaar: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'biometric'
  const [isVerifying, setIsVerifying] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [fingerprintVerified, setFingerprintVerified] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const simulateBiometric = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      if (type === "face") setFaceVerified(true);
      else setFingerprintVerified(true);
      setIsScanning(false);

 
      if (
        (type === "face" && fingerprintVerified) ||
        (type === "fingerprint" && faceVerified)
      ) {
        setTimeout(() => handleLogin(), 800);
      }
    }, 2000);
  };

 
  const handleLogin = async () => {
    try {
      if (loginMethod === "password") {
        if (!formData.aadhaar || !formData.password) {
          setMessage("⚠️ Please enter both Aadhaar and password.");
          return;
        }
        // if (formData.aadhaar.length !== 12) {
        //   setMessage("⚠️ Aadhaar number must be 12 digits.");
        //   return;
        // }
      } else {
        if (!faceVerified || !fingerprintVerified) {
          setMessage("⚠️ Please complete biometric verification.");
          return;
        }
      }

      setIsVerifying(true);
      setMessage("🔐 Verifying credentials...");

      // 🔸 API call to backend
      const response = await axios.post(
        "http://localhost:5000/api/voters/login",
        {
          aadhaar: formData.aadhaar,
          password: formData.password,
        }
      );

      if (response.data.success) {
        setMessage("✅ Login successful! Redirecting...");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("voterName", response.data.voter.name);

        setTimeout(() => {
          alert(
            `Welcome ${response.data.voter.name}! Redirecting to dashboard...`
          );
          // Navigate to dashboard page
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setMessage("⚠️ Invalid credentials or user not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(`⚠️ ${error.response.data.message}`);
      } else {
        setMessage("⚠️ Server not reachable. Try again later.");
      }
    } finally {
      setIsVerifying(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("voterName");
    setIsAuthenticated(false);
    alert("You have been logged out.");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Background animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to access your voter account</p>
        </div>

        {/* Login toggle */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLoginMethod("password")}
              className={`py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                loginMethod === "password"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Lock className="h-5 w-5" />
              <span>Password</span>
            </button>
            <button
              onClick={() => setLoginMethod("biometric")}
              className={`py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                loginMethod === "biometric"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Fingerprint className="h-5 w-5" />
              <span>Biometric</span>
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8">
          {loginMethod === "password" ? (
            <div className="space-y-6">
              {/* Aadhaar input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    placeholder="Enter 12-digit Aadhaar"
                    // maxLength={12}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              </div>

              {message && (
                <div
                  className={`p-4 rounded-xl flex items-center space-x-3 ${
                    message.includes("⚠️")
                      ? "bg-orange-50 border border-orange-200"
                      : message.includes("✅")
                      ? "bg-green-50 border border-green-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <AlertCircle
                    className={`h-5 w-5 ${
                      message.includes("⚠️")
                        ? "text-orange-600"
                        : message.includes("✅")
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                  <p className="text-sm font-medium text-gray-700">{message}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={isVerifying}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <h1 className="h-5 w-5" />
                <span>Logout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

            </div>
          ) : (
          
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Biometric Authentication
                </h3>
                <p className="text-sm text-gray-600">
                  Complete both verifications to sign in
                </p>
              </div>

              {/* Face recognition */}
              <div
                className={`p-6 rounded-2xl border-2 transition-all ${
                  faceVerified
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                      faceVerified
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : "bg-gradient-to-br from-purple-600 to-pink-600"
                    } ${isScanning ? "animate-pulse" : ""}`}
                  >
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Face Recognition
                  </h4>
                  {!faceVerified ? (
                    <button
                      onClick={() => simulateBiometric("face")}
                      disabled={isScanning}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
                    >
                      <Camera className="h-5 w-5" />
                      <span>{isScanning ? "Scanning..." : "Start Scan"}</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
                      <CheckCircle className="h-6 w-6" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fingerprint */}
              <div
                className={`p-6 rounded-2xl border-2 transition-all ${
                  fingerprintVerified
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                      fingerprintVerified
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : "bg-gradient-to-br from-blue-600 to-purple-600"
                    } ${isScanning ? "animate-pulse" : ""}`}
                  >
                    <Fingerprint className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Fingerprint Scan
                  </h4>
                  {!fingerprintVerified ? (
                    <button
                      onClick={() => simulateBiometric("fingerprint")}
                      disabled={isScanning}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
                    >
                      <Fingerprint className="h-5 w-5" />
                      <span>{isScanning ? "Scanning..." : "Start Scan"}</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
                      <CheckCircle className="h-6 w-6" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-purple-600 font-semibold transition-colors"
            >
              Register as Voter
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;

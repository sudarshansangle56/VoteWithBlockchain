import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Shield, Fingerprint, Camera, LogIn, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    aadhaar: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // password, biometric
  const [isVerifying, setIsVerifying] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [fingerprintVerified, setFingerprintVerified] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const simulateBiometric = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      if (type === 'face') {
        setFaceVerified(true);
      } else {
        setFingerprintVerified(true);
      }
      setIsScanning(false);
      
      // Auto-login when both are verified
      if ((type === 'face' && fingerprintVerified) || (type === 'fingerprint' && faceVerified)) {
        setTimeout(() => {
          handleLogin();
        }, 500);
      }
    }, 2000);
  };

  const handleLogin = () => {
    if (loginMethod === 'password') {
      if (!formData.aadhaar || !formData.password) {
        setMessage("⚠️ Please enter both Aadhaar and password.");
        return;
      }
      if (formData.aadhaar.length !== 12) {
        setMessage("⚠️ Please enter a valid 12-digit Aadhaar number.");
        return;
      }
    } else {
      if (!faceVerified || !fingerprintVerified) {
        setMessage("⚠️ Please complete biometric verification.");
        return;
      }
    }

    setIsVerifying(true);
    setMessage("🔐 Verifying your credentials...");
    
    setTimeout(() => {
      setMessage("✅ Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        alert("Login successful! Redirecting to dashboard...");
        // navigate to dashboard
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Animated Background */}
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

        {/* Login Method Toggle */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLoginMethod('password')}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                loginMethod === 'password'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Lock className="h-5 w-5" />
              <span>Password</span>
            </button>
            <button
              onClick={() => setLoginMethod('biometric')}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                loginMethod === 'biometric'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Fingerprint className="h-5 w-5" />
              <span>Biometric</span>
            </button>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8">
          {loginMethod === 'password' ? (
            /* Password Login */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    placeholder="Enter 12-digit Aadhaar"
                    maxLength={12}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
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
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600 rounded" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-purple-600 font-semibold transition-colors">
                  Forgot Password?
                </a>
              </div>

              {message && (
                <div className={`p-4 rounded-xl flex items-center space-x-3 ${
                  message.includes('⚠️') ? 'bg-orange-50 border border-orange-200' :
                  message.includes('✅') ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <AlertCircle className={`h-5 w-5 ${
                    message.includes('⚠️') ? 'text-orange-600' :
                    message.includes('✅') ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
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
            </div>
          ) : (
            /* Biometric Login */
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Biometric Authentication</h3>
                <p className="text-sm text-gray-600">Complete both verifications to sign in</p>
              </div>

              <div className="grid gap-6">
                {/* Face Recognition */}
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  faceVerified ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      faceVerified ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-purple-600 to-pink-600'
                    } ${isScanning ? 'animate-pulse' : ''}`}>
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Face Recognition</h4>
                    <p className="text-sm text-gray-600 mb-4">Look directly at the camera</p>
                    
                    {!faceVerified ? (
                      <button
                        onClick={() => simulateBiometric('face')}
                        disabled={isScanning}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
                      >
                        <Camera className="h-5 w-5" />
                        <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
                        <CheckCircle className="h-6 w-6" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fingerprint Scan */}
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  fingerprintVerified ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      fingerprintVerified ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'
                    } ${isScanning ? 'animate-pulse' : ''}`}>
                      <Fingerprint className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Fingerprint Scan</h4>
                    <p className="text-sm text-gray-600 mb-4">Place finger on scanner</p>
                    
                    {!fingerprintVerified ? (
                      <button
                        onClick={() => simulateBiometric('fingerprint')}
                        disabled={isScanning}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
                      >
                        <Fingerprint className="h-5 w-5" />
                        <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
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

              {(faceVerified && fingerprintVerified) && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center space-x-3 text-green-700">
                    <CheckCircle className="h-6 w-6" />
                    <div>
                      <p className="font-bold text-sm">Authentication Complete!</p>
                      <p className="text-xs">Signing you in...</p>
                    </div>
                  </div>
                </div>
              )}

              {message && (
                <div className={`p-4 rounded-xl flex items-center space-x-3 ${
                  message.includes('⚠️') ? 'bg-orange-50 border border-orange-200' :
                  message.includes('✅') ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <AlertCircle className={`h-5 w-5 ${
                    message.includes('⚠️') ? 'text-orange-600' :
                    message.includes('✅') ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                  <p className="text-sm font-medium text-gray-700">{message}</p>
                </div>
              )}
            </div>
          )}

          {/* Security Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-600 text-center flex items-center justify-center space-x-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Secured by blockchain technology and end-to-end encryption</span>
            </p>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">
              Register as Voter
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600 font-medium">Secure</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <Fingerprint className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600 font-medium">Biometric</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600 font-medium">Verified</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
import React, { useState, useEffect } from 'react';
import { Fingerprint, Shield, Eye, EyeOff, CheckCircle, User, Mail, Phone, Calendar, MapPin, Lock, Camera, Scan, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    aadhaar: "", name: "", email: "", phone: "", dob: "", address: "", password: "", confirmPassword: "", fingerprintId: ""
  });
  const [step, setStep] = useState(1);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [fingerprintDone, setFingerprintDone] = useState(false);
  const [faceDone, setFaceDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // Generate a browser fingerprint using available browser APIs
  useEffect(() => {
    const generateFingerprint = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser Fingerprint', 2, 2);
      
      const fingerprint = {
        canvas: canvas.toDataURL(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${screen.width}x${screen.height}`,
        timestamp: Date.now()
      };
      
      const fingerprintString = JSON.stringify(fingerprint);
      const hash = Array.from(fingerprintString).reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
      }, 0);
      
      const fingerprintId = `FP${Math.abs(hash).toString(16).toUpperCase()}`;
      setFormData((prev) => ({ ...prev, fingerprintId }));
      console.log("Generated Fingerprint ID:", fingerprintId);
    };
    
    generateFingerprint();
  }, []);

  const simulateBiometric = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      if (type === 'fingerprint') setFingerprintDone(true);
      else setFaceDone(true);
      setIsScanning(false);
      if ((type === 'fingerprint' && faceDone) || (type === 'face' && fingerprintDone)) {
        setBiometricVerified(true);
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
    if (!biometricVerified) return alert("Please complete biometric verification!");
    if (!termsAccepted) return alert("Please accept terms and conditions!");
    
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/voters/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        alert("Registration successful! Redirecting to login...");
        console.log("User registered:", data);
        // You can navigate to login page here if using React Router
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      alert("Failed to register. Please try again later.");
    }
  };

  const canProceedStep1 = formData.aadhaar && formData.name && formData.email && formData.phone && formData.dob && formData.address && formData.password && formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Voter Registration
          </h1>
          <p className="text-gray-600">Secure your voting rights with blockchain verification</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Personal Info", icon: User },
              { num: 2, label: "Biometric Scan", icon: Fingerprint },
              { num: 3, label: "Review & Submit", icon: CheckCircle }
            ].map((item, idx) => (
              <React.Fragment key={item.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    step > item.num ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg' :
                    step === item.num ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50' :
                    'bg-gray-200'
                  }`}>
                    {step > item.num ? <Check className="h-7 w-7 text-white" /> : <item.icon className={`h-7 w-7 ${step >= item.num ? 'text-white' : 'text-gray-400'}`} />}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${step >= item.num ? 'text-gray-800' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                    step > item.num ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
                <p className="text-gray-600">Please provide your details as per your Aadhaar card</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="XXXX-XXXX-XXXX"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="As per Aadhaar"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create strong password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Enter your complete address"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
              </div>

              <button type="button" onClick={() => canProceedStep1 && setStep(2)} disabled={!canProceedStep1}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <span>Continue to Biometric Scan</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Step 2: Biometric Verification */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Biometric Authentication</h3>
                <p className="text-gray-600">Secure your account with multi-factor biometric verification</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${fingerprintDone ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      fingerprintDone ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'
                    } ${isScanning ? 'animate-pulse' : ''}`}>
                      <Fingerprint className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Fingerprint Scan</h4>
                    <p className="text-gray-600 text-sm mb-6">Place your finger on the scanner</p>
                    
                    {!fingerprintDone ? (
                      <button type="button" onClick={() => simulateBiometric('fingerprint')} disabled={isScanning}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto">
                        <Scan className="h-5 w-5" />
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

                <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${faceDone ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      faceDone ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-purple-600 to-pink-600'
                    } ${isScanning ? 'animate-pulse' : ''}`}>
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Face Recognition</h4>
                    <p className="text-gray-600 text-sm mb-6">Look directly at the camera</p>
                    
                    {!faceDone ? (
                      <button type="button" onClick={() => simulateBiometric('face')} disabled={isScanning}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto">
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
              </div>

              {biometricVerified && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <div className="flex flex-col items-center space-y-2 text-green-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-8 w-8" />
                      <p className="font-bold text-lg">Biometric Verification Complete!</p>
                    </div>
                    <p className="text-sm">Your identity has been successfully verified</p>
                    <p className="text-xs text-gray-600">
                      Visitor ID: {formData.fingerprintId || "Generating..."}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </button>
                <button type="button" onClick={() => setStep(3)} disabled={!biometricVerified}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                  <span>Review Details</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h3>
                <p className="text-gray-600">Please verify all details before submitting</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Personal Information</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Aadhaar Number', value: formData.aadhaar },
                      { label: 'Full Name', value: formData.name },
                      { label: 'Email', value: formData.email },
                      { label: 'Phone', value: formData.phone },
                      { label: 'Date of Birth', value: formData.dob },
                      { label: 'Address', value: formData.address }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start py-2 border-b border-blue-100">
                        <span className="text-gray-600 font-medium text-sm">{item.label}</span>
                        <span className="text-gray-800 font-semibold text-sm text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Verification Status</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Fingerprint Scan</span>
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Face Recognition</span>
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Browser Fingerprint</span>
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold text-xs">{formData.fingerprintId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 w-5 h-5 accent-blue-600" />
                <label className="text-sm text-gray-700 leading-relaxed">
                  I hereby declare that all information provided is accurate and complete. I agree to the <span className="text-blue-600 font-semibold">Terms & Conditions</span> and consent to the use of my biometric data for voter authentication purposes.
                </label>
              </div>

              <div className="flex space-x-4">
                <button type="button" onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleSubmit} disabled={loading}
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50">
                  <CheckCircle className="h-5 w-5" />
                  <span>{loading ? 'Submitting...' : 'Complete Registration'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

// import React, { useState , useEffect } from 'react';
// import { Fingerprint, Shield, Eye, EyeOff, CheckCircle, User, Mail, Phone, Calendar, MapPin, Lock, Camera, Scan, ArrowRight, ArrowLeft, Check } from 'lucide-react';
// import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     aadhaar: "", name: "", email: "", phone: "", dob: "", address: "", password: "", confirmPassword: ""
//   });
//   const [step, setStep] = useState(1);
//   const [biometricVerified, setBiometricVerified] = useState(false);
//   const [fingerprintDone, setFingerprintDone] = useState(false);
//   const [faceDone, setFaceDone] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isScanning, setIsScanning] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const { isLoading, error, data, getData } = useVisitorData(
//     { extendedResult: true },
//     { immediate: true }
//   );  
//   useEffect(() => {
//     if (data && data.visitorId) {
//       console.log("Visitor Fingerprint ID:", data.visitorId);
//       // You can also store this in formData or send to backend
//       setFormData((prev) => ({ ...prev, fingerprintId: data.visitorId }));
//     }
//   }, [data]);
//   const simulateBiometric = (type) => {
//     setIsScanning(true);
//     setTimeout(() => {
//       if (type === 'fingerprint') setFingerprintDone(true);
//       else setFaceDone(true);
//       setIsScanning(false);
//       if ((type === 'fingerprint' && faceDone) || (type === 'face' && fingerprintDone)) {
//         setBiometricVerified(true);
//       }
//     }, 2000);
//   };

//   const handleSubmit = () => {
//     if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
//     if (!biometricVerified) return alert("Please complete biometric verification!");
//     if (!termsAccepted) return alert("Please accept terms and conditions!");
//     alert("Registration successful! Redirecting to login...");
//   };

//   const canProceedStep1 = formData.aadhaar && formData.name && formData.email && formData.phone && formData.dob && formData.address && formData.password && formData.confirmPassword;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
//       </div>

//       <div className="max-w-5xl mx-auto relative">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
//             <User className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Voter Registration
//           </h1>
//           <p className="text-gray-600">Secure your voting rights with blockchain verification</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="mb-12">
//           <div className="flex items-center justify-between max-w-2xl mx-auto">
//             {[
//               { num: 1, label: "Personal Info", icon: User },
//               { num: 2, label: "Biometric Scan", icon: Fingerprint },
//               { num: 3, label: "Review & Submit", icon: CheckCircle }
//             ].map((item, idx) => (
//               <React.Fragment key={item.num}>
//                 <div className="flex flex-col items-center">
//                   <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                     step > item.num ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg' :
//                     step === item.num ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50' :
//                     'bg-gray-200'
//                   }`}>
//                     {step > item.num ? <Check className="h-7 w-7 text-white" /> : <item.icon className={`h-7 w-7 ${step >= item.num ? 'text-white' : 'text-gray-400'}`} />}
//                   </div>
//                   <span className={`mt-2 text-sm font-medium ${step >= item.num ? 'text-gray-800' : 'text-gray-400'}`}>
//                     {item.label}
//                   </span>
//                 </div>
//                 {idx < 2 && (
//                   <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
//                     step > item.num ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
//                   }`}></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
//           {/* Step 1: Personal Information */}
//           {step === 1 && (
//             <div className="space-y-6">
//               <div className="mb-6">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
//                 <p className="text-gray-600">Please provide your details as per your Aadhaar card</p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number</label>
//                   <div className="relative">
//                     <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="XXXX-XXXX-XXXX"
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="As per Aadhaar"
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                   <div className="relative">
//                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
//                   <div className="relative">
//                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX"
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
//                   <div className="relative">
//                     <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input type="date" name="dob" value={formData.dob} onChange={handleChange}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create strong password"
//                       className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
//                       {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
//                   <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Enter your complete address"
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
//                 </div>
//               </div>

//               <button type="button" onClick={() => canProceedStep1 && setStep(2)} disabled={!canProceedStep1}
//                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
//                 <span>Continue to Biometric Scan</span>
//                 <ArrowRight className="h-5 w-5" />
//               </button>
//             </div>
//           )}

//           {/* Step 2: Biometric Verification */}
//           {step === 2 && (
//             <div className="space-y-8">
//               <div className="text-center mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Biometric Authentication</h3>
//                 <p className="text-gray-600">Secure your account with multi-factor biometric verification</p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${fingerprintDone ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
//                   <div className="text-center">
//                     <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
//                       fingerprintDone ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'
//                     } ${isScanning ? 'animate-pulse' : ''}`}>
//                       <Fingerprint className="h-12 w-12 text-white" />
//                     </div>
//                     <h4 className="text-xl font-bold text-gray-800 mb-2">Fingerprint Scan</h4>
//                     <p className="text-gray-600 text-sm mb-6">Place your finger on the scanner</p>
                    
//                     {!fingerprintDone ? (
//                       <button type="button" onClick={() => simulateBiometric('fingerprint')} disabled={isScanning}
//                         className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto">
//                         <Scan className="h-5 w-5" />
//                         <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
//                       </button>
//                     ) : (
//                       <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
//                         <CheckCircle className="h-6 w-6" />
//                         <span>Verified</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${faceDone ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
//                   <div className="text-center">
//                     <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
//                       faceDone ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-purple-600 to-pink-600'
//                     } ${isScanning ? 'animate-pulse' : ''}`}>
//                       <Camera className="h-12 w-12 text-white" />
//                     </div>
//                     <h4 className="text-xl font-bold text-gray-800 mb-2">Face Recognition</h4>
//                     <p className="text-gray-600 text-sm mb-6">Look directly at the camera</p>
                    
//                     {!faceDone ? (
//                       <button type="button" onClick={() => simulateBiometric('face')} disabled={isScanning}
//                         className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto">
//                         <Camera className="h-5 w-5" />
//                         <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
//                       </button>
//                     ) : (
//                       <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
//                         <CheckCircle className="h-6 w-6" />
//                         <span>Verified</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {biometricVerified && (
//                 <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
//                   <div className="flex items-center justify-center space-x-3 text-green-700">
//                     <CheckCircle className="h-8 w-8" />
//                     <div>
//                       <p className="font-bold text-lg">Biometric Verification Complete!</p>
//                       <p className="text-sm">Your identity has been successfully verified</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex space-x-4">
//                 <button type="button" onClick={() => setStep(1)}
//                   className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2">
//                   <ArrowLeft className="h-5 w-5" />
//                   <span>Back</span>
//                 </button>
//                 <button type="button" onClick={() => setStep(3)} disabled={!biometricVerified}
//                   className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
//                   <span>Review Details</span>
//                   <ArrowRight className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Review & Submit */}
//           {step === 3 && (
//             <div className="space-y-8">
//               <div className="text-center mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h3>
//                 <p className="text-gray-600">Please verify all details before submitting</p>
//               </div>

//               <div className="space-y-6">
//                 <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
//                   <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
//                     <User className="h-5 w-5 text-blue-600" />
//                     <span>Personal Information</span>
//                   </h4>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {[
//                       { label: 'Aadhaar Number', value: formData.aadhaar },
//                       { label: 'Full Name', value: formData.name },
//                       { label: 'Email', value: formData.email },
//                       { label: 'Phone', value: formData.phone },
//                       { label: 'Date of Birth', value: formData.dob },
//                       { label: 'Address', value: formData.address }
//                     ].map((item, idx) => (
//                       <div key={idx} className="flex justify-between items-start py-2 border-b border-blue-100">
//                         <span className="text-gray-600 font-medium text-sm">{item.label}</span>
//                         <span className="text-gray-800 font-semibold text-sm text-right">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
//                   <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
//                     <Shield className="h-5 w-5 text-green-600" />
//                     <span>Verification Status</span>
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-600 font-medium">Fingerprint Scan</span>
//                       <div className="flex items-center space-x-2 text-green-600">
//                         <CheckCircle className="h-5 w-5" />
//                         <span className="font-semibold">Verified</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-600 font-medium">Face Recognition</span>
//                       <div className="flex items-center space-x-2 text-green-600">
//                         <CheckCircle className="h-5 w-5" />
//                         <span className="font-semibold">Verified</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
//                 <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 w-5 h-5 accent-blue-600" />
//                 <label className="text-sm text-gray-700 leading-relaxed">
//                   I hereby declare that all information provided is accurate and complete. I agree to the <span className="text-blue-600 font-semibold">Terms & Conditions</span> and consent to the use of my biometric data for voter authentication purposes.
//                 </label>
//               </div>

//               <div className="flex space-x-4">
//                 <button type="button" onClick={() => setStep(2)}
//                   className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2">
//                   <ArrowLeft className="h-5 w-5" />
//                   <span>Back</span>
//                 </button>
//                 <button type="button" onClick={handleSubmit}
//                   className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
//                   <CheckCircle className="h-5 w-5" />
//                   <span>Complete Registration</span>
//                 </button>
//               </div>
//             </div>
//           )}
//           {biometricVerified && (
//   <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
//     <div className="flex flex-col items-center space-y-2 text-green-700">
//       <div className="flex items-center space-x-2">
//         <CheckCircle className="h-8 w-8" />
//         <p className="font-bold text-lg">Biometric Verification Complete!</p>
//       </div>
//       <p className="text-sm">
//         Your identity has been successfully verified.
//       </p>
//       <p className="text-xs text-gray-600">
//         Visitor ID: {isLoading ? "Loading..." : data?.visitorId || "Unavailable"}
//       </p>
//     </div>
//   </div>
// )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;
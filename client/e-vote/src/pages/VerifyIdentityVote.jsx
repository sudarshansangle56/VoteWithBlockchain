import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Vote,
  CheckCircle,
  Fingerprint,
  Camera,
  Shield,
  ArrowLeft,
  Scan,
  Lock,
  AlertCircle,
  Award,
} from 'lucide-react';

const VerifyIdentityVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [aadhaar, setAadhaar] = useState('');
  const [step, setStep] = useState('select'); // select, verify, success
  const [faceVerified, setFaceVerified] = useState(false);
  const [fingerprintVerified, setFingerprintVerified] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(res.data);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setMessage('⚠️ Failed to load candidates. Please try again later.');
      }
    };
    fetchCandidates();
  }, []);

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setStep('verify');
    setMessage('');
  };

  const simulateBiometric = (type) => {
    setIsScanning(true);
    setMessage(`Scanning ${type}...`);
    setTimeout(() => {
      if (type === 'face') {
        setFaceVerified(true);
        setMessage(' Face verified successfully!');
      } else {
        setFingerprintVerified(true);
        setMessage('Fingerprint verified successfully!');
      }
      setIsScanning(false);
    }, 2000);
  };

  const handleSubmitVote = async () => {
    if (!aadhaar || aadhaar.length !== 12) {
      setMessage('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (!faceVerified || !fingerprintVerified) {
      setMessage(' Please complete biometric verification.');
      return;
    }

    try {
      setMessage('Submitting your vote to blockchain...');
      // Example: Update candidate vote count (optional future step)
      await axios.put(`http://localhost:5000/api/candidates/${selectedCandidate._id}`, {
        votes: selectedCandidate.votes + 1,
      });

      setTimeout(() => {
        setStep('success');
        setMessage('✅ Your vote has been securely recorded on the blockchain!');
      }, 2000);
    } catch (error) {
      console.error('Error submitting vote:', error);
      setMessage('⚠️ Failed to record vote. Try again.');
    }
  };

  const reset = () => {
    setSelectedCandidate(null);
    setStep('select');
    setFaceVerified(false);
    setFingerprintVerified(false);
    setAadhaar('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
            <Vote className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Cast Your Vote
          </h1>
          <p className="text-gray-600">Select your candidate and verify your identity</p>
        </div>

        {/* Candidate Selection */}
        {step === 'select' && (
          <>
            {candidates.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">Loading candidates...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {candidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                          <span className="text-4xl">🗳️</span>
                        </div>

                        <div>
                          <h2 className="text-xl font-bold text-gray-800 mb-1">{candidate.name}</h2>
                          <p className="text-sm text-gray-600 mb-3">{candidate.party || 'Independent'}</p>
                          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 rounded-full">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-600">
                              {candidate.status === 'Approved' ? 'Verified Candidate' : 'Pending'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleVoteClick(candidate)}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Vote className="h-5 w-5" />
                          <span>Vote Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Verification Step */}
        {step === 'verify' && selectedCandidate && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
              <button
                onClick={reset}
                className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Candidates</span>
              </button>

              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow">
                    <span className="text-3xl">🗳️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">You are voting for:</p>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedCandidate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCandidate.party}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span>Verify Your Identity</span>
                </h3>
                <p className="text-gray-600">Complete all verification steps to cast your vote</p>
              </div>

              {/* Face and Fingerprint Verification */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Face */}
                <div
                  className={`p-6 rounded-2xl border-2 ${
                    faceVerified ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                  } transition-all duration-300`}
                >
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                        faceVerified
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-purple-600 to-pink-600'
                      } ${isScanning ? 'animate-pulse' : ''}`}
                    >
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Face Recognition</h4>
                    <p className="text-sm text-gray-600 mb-4">Position your face in camera view</p>
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

                {/* Fingerprint */}
                <div
                  className={`p-6 rounded-2xl border-2 ${
                    fingerprintVerified ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                  } transition-all duration-300`}
                >
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                        fingerprintVerified
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : 'bg-gradient-to-br from-blue-600 to-purple-600'
                      } ${isScanning ? 'animate-pulse' : ''}`}
                    >
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
              </div>

              {/* Aadhaar Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhaar"
                    maxLength={12}
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    message.includes('⚠️')
                      ? 'bg-orange-50 border border-orange-200'
                      : message.includes('✅')
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <AlertCircle
                    className={`h-5 w-5 ${
                      message.includes('⚠️')
                        ? 'text-orange-600'
                        : message.includes('✅')
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`}
                  />
                  <p className="text-sm font-medium text-gray-700">{message}</p>
                </div>
              )}

              <button
                onClick={handleSubmitVote}
                disabled={!faceVerified || !fingerprintVerified || aadhaar.length !== 12}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Lock className="h-5 w-5" />
                <span>Submit Vote Securely</span>
              </button>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-600 text-center flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Your vote is encrypted and recorded on blockchain for maximum security</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30 animate-bounce">
                <CheckCircle className="h-14 w-14 text-white" />
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Vote Successfully Recorded!
              </h2>

              <p className="text-lg text-gray-600 mb-6">{message}</p>

              <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Vote For:</span>
                  <span className="text-lg font-bold text-gray-800">{selectedCandidate.name}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Party:</span>
                  <span className="text-sm text-gray-800">{selectedCandidate.party}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-600">Blockchain Verified</span>
                  </div>
                </div>
              </div>

              <button
                onClick={reset}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
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

export default VerifyIdentityVote;
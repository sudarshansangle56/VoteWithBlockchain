import React, { useState, useEffect } from 'react';
import { Users, Shield, Lock, FileText, Vote, CheckCircle, Download, Clock, Activity, Fingerprint, Database, Award } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from "axios";

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon, title, value, color, subtitle }) => {
  const gradients = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-amber-500"
  };

  return (
    <GlassCard className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[color]} p-3 mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
            {icon}
          </div>
          <h4 className="text-gray-500 text-sm font-medium mb-1">{title}</h4>
          <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </GlassCard>
  );
};

// Modern info row with icons
const ModernInfoRow = ({ icon, label, value, verified }) => (
  <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors group">
    <div className="flex items-center space-x-3">
      <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
        {icon}
      </div>
      <span className="text-gray-600 font-medium">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-gray-800 font-semibold">{value}</span>
      {verified && <CheckCircle className="h-5 w-5 text-green-500" />}
    </div>
  </div>
);

// Modern action button
const ActionButton = ({ icon, text, onClick, variant = "primary", disabled }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-default",
    secondary: "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch voter details from backend
  useEffect(() => {
    const fetchVoterData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please login first.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/voters/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set voter details
        setUser({
          name: res.data.name,
          aadhaar: res.data.aadhaar,
          hasVoted: false, // you can replace with real voting logic
          voterId: res.data._id,
          biometricVerified: res.data.biometricStatus === "verified",
        });
      } catch (error) {
        console.error("Error fetching voter details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoterData();
  }, []);

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading voter dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load voter data. Please login again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Voter Dashboard
          </h1>
          <p className="text-gray-600 flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Secure voting powered by blockchain technology</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Vote className="h-full w-full text-white" />}
            title="Voting Status"
            value={user?.hasVoted ? "Completed" : "Pending"}
            subtitle={user?.hasVoted ? "Vote recorded" : "Ready to vote"}
            color="blue"
          />
          <StatCard
            icon={<Fingerprint className="h-full w-full text-white" />}
            title="Biometric Auth"
            value={user?.biometricVerified ? "Verified" : "Not Verified"}
            subtitle="Face + Fingerprint"
            color={user?.biometricVerified ? "green" : "orange"}
          />
          <StatCard
            icon={<Database className="h-full w-full text-white" />}
            title="Blockchain"
            value="Synced"
            subtitle="Fog node active"
            color="purple"
          />
          <StatCard
            icon={<Activity className="h-full w-full text-white" />}
            title="Network Status"
            value="Online"
            subtitle="Low latency"
            color="orange"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Voter Information Card */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2">
                  <FileText className="h-full w-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Your Profile</h3>
              </div>
              
              <div className="space-y-1">
                <ModernInfoRow 
                  icon={<Users className="h-5 w-5" />}
                  label="Full Name" 
                  value={user?.name || "N/A"}
                  verified={true}
                />
                <ModernInfoRow 
                  icon={<Shield className="h-5 w-5" />}
                  label="Aadhaar Number" 
                  value={user?.aadhaar || "N/A"}
                  verified={true}
                />
                <ModernInfoRow 
                  icon={<Award className="h-5 w-5" />}
                  label="Voter ID" 
                  value={user?.voterId}
                  verified={true}
                />
                <ModernInfoRow 
                  icon={<Fingerprint className="h-5 w-5" />}
                  label="Biometric Status" 
                  value={user?.biometricVerified ? "Authenticated" : "Pending"}
                  verified={user?.biometricVerified}
                />
                <ModernInfoRow 
                  icon={<Vote className="h-5 w-5" />}
                  label="Voting Rights" 
                  value={user?.hasVoted ? "Exercised" : "Active"}
                  verified={!user?.hasVoted}
                />
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <Lock className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">Blockchain Secured</p>
                    <p className="text-xs text-green-600">Your vote is encrypted and immutable</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Actions Card */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                {!user?.hasVoted ? (
                  <Link to="/vote">
                    <ActionButton 
                      icon={<Vote className="h-5 w-5" />}
                      text="Cast Your Vote"
                      variant="primary"
                    />
                  </Link>
                ) : (
                  <ActionButton
                    icon={<CheckCircle className="h-5 w-5" />}
                    text="Vote Recorded"
                    variant="success"
                    disabled
                  />
                )}
                
                <ActionButton
                  icon={<Activity className="h-5 w-5" />}
                  text="Transaction History"
                  onClick={() => navigate("history")}
                  variant="secondary"
                />
                
                <ActionButton
                  icon={<Download className="h-5 w-5" />}
                  text="Download Voter Card"
                  onClick={() => navigate("download")}
                  variant="secondary"
                />
              </div>

              {/* System Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3 font-medium">SYSTEM STATUS</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Fog Node</span>
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-green-600 font-medium">Active</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Latency</span>
                    <span className="text-gray-800 font-medium">12ms</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Block Height</span>
                    <span className="text-gray-800 font-medium">#45,892</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

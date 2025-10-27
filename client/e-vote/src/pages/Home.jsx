import React, { useState, useEffect } from 'react';
import { Vote, Shield, Lock, Fingerprint, Database, Zap, CheckCircle, Globe, Users, ArrowRight, Menu, X } from 'lucide-react';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blockchain Security",
      description: "Immutable voting records secured by distributed ledger technology",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Fingerprint className="h-8 w-8" />,
      title: "Biometric Authentication",
      description: "Multi-factor verification using facial recognition and fingerprints",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fog Computing",
      description: "Low-latency processing with edge computing infrastructure",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "End-to-End Encryption",
      description: "Your vote remains anonymous and completely secure",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "100%", label: "Secure" },
    { number: "0", label: "Tampering" },
    { number: "<50ms", label: "Latency" },
    { number: "∞", label: "Transparency" }
  ];

  const steps = [
    { icon: <Users className="h-6 w-6" />, title: "Register", desc: "Verify your identity" },
    { icon: <Fingerprint className="h-6 w-6" />, title: "Authenticate", desc: "Biometric scan" },
    { icon: <Vote className="h-6 w-6" />, title: "Vote", desc: "Cast your ballot" },
    { icon: <CheckCircle className="h-6 w-6" />, title: "Confirm", desc: "Blockchain verified" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      {/* <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2 shadow-lg">
                <Vote className="h-full w-full text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SecureVote</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">How It Works</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                Login
              </button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-200 shadow-sm">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700 font-medium">Next-Generation Voting Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Democracy
              </span>
              <br />
              <span className="text-gray-800">Reimagined</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Experience the future of voting with blockchain-secured, biometrically-authenticated elections powered by fog computing for lightning-fast results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-white/80 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-xl text-gray-600">Built on the most advanced security infrastructure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Four simple steps to secure voting</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-4 shadow-xl shadow-purple-500/20 hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{step.icon}</div>
                  </div>
                  {idx < 3 && (
                    <div className="absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 hidden md:block rounded-full"></div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Badge Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h4 className="font-bold text-gray-800 mb-2">256-bit Encryption</h4>
                <p className="text-sm text-gray-600">Bank-level security</p>
              </div>
              <div>
                <Database className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h4 className="font-bold text-gray-800 mb-2">Decentralized Storage</h4>
                <p className="text-sm text-gray-600">Distributed blockchain</p>
              </div>
              <div>
                <Fingerprint className="h-12 w-12 mx-auto mb-4 text-pink-600" />
                <h4 className="font-bold text-gray-800 mb-2">Multi-factor Auth</h4>
                <p className="text-sm text-gray-600">Biometric verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden p-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Experience Secure Voting?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of voters who trust our blockchain-powered platform
              </p>
              <button className="px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                Start Voting Now
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white/40 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2">
                  <Vote className="h-full w-full text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SecureVote</span>
              </div>
              <p className="text-gray-600 mb-4">Revolutionizing democracy with blockchain technology, fog computing, and biometric authentication.</p>
              <p className="text-gray-500 text-sm">© 2024 SecureVote. All rights reserved.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#how-it-works" className="block text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
                <a href="#about" className="block text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Help Center</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
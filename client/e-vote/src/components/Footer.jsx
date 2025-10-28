import React from "react";
import { ShieldCheck, Mail, Twitter, GitHub } from "lucide-react";

export default function Footer({ year = new Date().getFullYear() }) {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-600 to-sky-500">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">SecureVote</h3>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 max-w-xs">
              Revolutionizing democracy with blockchain technology, fog computing,
              and biometric authentication.
            </p>

            <p className="mt-6 text-xs text-slate-400">
              © {year} SecureVote. All rights reserved.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="mailto:support@securevote.example"
                aria-label="Email support"
                className="p-2 rounded-md hover:bg-slate-800"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:bg-slate-800"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:bg-slate-800"
              >
                <GitHub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="md:col-span-2 flex justify-between">
            <ul className="space-y-3">
              <li>
                <h4 className="text-sm font-medium text-white">Quick Links</h4>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm hover:text-white text-slate-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm hover:text-white text-slate-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm hover:text-white text-slate-300">
                  About Us
                </a>
              </li>
            </ul>

            <ul className="space-y-3">
              <li>
                <h4 className="text-sm font-medium text-white">Support</h4>
              </li>
              <li>
                <a
                  href="#help-center"
                  className="text-sm hover:text-white text-slate-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-sm hover:text-white text-slate-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-sm hover:text-white text-slate-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* small footer bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <span>Built with ❤️ for secure, transparent elections.</span>
          <span className="mt-2 md:mt-0">Made by SecureVote</span>
        </div>
      </div>
    </footer>
  );
}

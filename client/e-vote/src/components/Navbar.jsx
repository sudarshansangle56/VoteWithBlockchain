import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">E-Voting</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <a href="#" className="hover:text-yellow-300 transition">
            Home
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            About
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Work
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 flex flex-col items-center gap-6 py-6 text-lg font-medium">
          <a href="#" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>
            Work
          </a>
          <a href="#" className="hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>
            Login
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

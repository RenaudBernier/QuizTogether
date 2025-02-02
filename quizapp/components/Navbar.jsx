"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-white tracking-wide">
            QuizMaster 🚀
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavItem href="/" label="Home" />
            <NavItem href="/about" label="About" />
            <NavItem href="/quizzes" label="Quizzes" />
            <NavItem href="/leaderboard" label="Leaderboard" />
            
            {/* Dropdown Menu */}
            {/* <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-lg text-white hover:text-yellow-300 transition-all"
              >
                More ▼
              </button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute bg-white text-gray-800 shadow-lg p-3 rounded-md mt-2"
                >
                  <NavItem href="/leaderboard" label="Leaderboard" />
                  <NavItem href="/settings" label="Settings" />
                </motion.div>
              )}
            </div> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-gradient-to-b from-indigo-600 to-pink-500 p-4 text-white"
        >
          <NavItem href="/" label="Home" />
          <NavItem href="/about" label="About" />
          <NavItem href="/quizzes" label="Quizzes" />
          <NavItem href="/leaderboard" label="Leaderboard" />
        </motion.div>
      )}
    </nav>
  );
}

// Animated Navigation Item
function NavItem({ href, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="text-lg font-medium text-white hover:text-yellow-300 transition-all"
    >
      <Link href={href}>{label}</Link>
    </motion.div>
  );
}
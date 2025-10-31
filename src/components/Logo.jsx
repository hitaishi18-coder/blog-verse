import React from "react";
import { Link } from "react-router-dom";

//  Logo Component — App ka Brand/Title Section
//  Ye mostly Header me use hota hai (top-left corner)
// Smooth animation aur hover glow effect add kiya gaya hai

function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/*  Emoji Style Icon */}
      <span
        className="text-3xl animate-bounce"
        role="img"
        aria-label="logo"
      >
        
      </span>

      {/*  App Title / Brand Name */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        BlogVerse
      </Link>
    </div>
  );
}

export default Logo;

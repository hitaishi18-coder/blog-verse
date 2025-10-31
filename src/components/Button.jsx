import React from "react";

//  Button Component — Reusable & Stylish
//  Ye component har jagah use hota hai (Login, Signup, Post, etc.)
// Props: children (text), type, bgColor, textColor, className (extra styles)
function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`
        ${bgColor} ${textColor} ${className}
        px-5 py-2.5 rounded-xl font-semibold shadow-md 
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg 
        hover:brightness-110 active:scale-95 
        focus:outline-none focus:ring-4 focus:ring-blue-200
        flex items-center justify-center gap-2
      `}
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/*  Button Text */}
      <span className="flex items-center gap-2">
        {children} <span>🚀</span>
      </span>
    </button>
  );
}

export default Button;

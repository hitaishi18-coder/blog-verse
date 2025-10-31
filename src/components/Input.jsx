import React, { useId } from "react";

//  Input Component — Reusable Form Input Field
//  Ye component Login, Signup, Add/Edit Post forms me use hota hai.
// Props: label (text), type (input type), className (extra styling)
function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId(); // unique id har input ke liye (accessibility ke liye)

  return (
    <div className="mb-5">
      {/*  Label — input ke upar likha hua text */}
      {label && (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-semibold mb-2 tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {label}
        </label>
      )}

      {/* Input Field with effects */}
      <input
        type={type}
        id={id}
        ref={ref}
        {...props}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none 
          focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 ease-in-out
          shadow-sm hover:shadow-md placeholder-gray-400 ${className}`}
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      />
    </div>
  );
}

export default React.forwardRef(Input);

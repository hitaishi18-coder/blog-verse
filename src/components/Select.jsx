import React, { forwardRef } from "react";

// Select Component — works with react-hook-form register
const Select = forwardRef(({ label, options = [], className = "", ...rest }, ref) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-sm font-semibold text-gray-700">{label}</label>
      )}
      <select
        ref={ref}
        {...rest}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
      >
        {/* Default empty option */}
        <option value="">-- Select --</option>
        {/* Map options dynamically */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;

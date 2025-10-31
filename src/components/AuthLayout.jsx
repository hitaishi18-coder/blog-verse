import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; //  Redux se user data lena
import { useNavigate } from "react-router-dom"; // Navigation ke liye

// AuthLayout: ye ek HOC (Higher Order Component) jaisa kaam karta hai
// Ye decide karta hai user ko route pe access dena hai ya nahi
function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  // Redux store se user login status le rahe hain
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //  Loader initially true hai jab tak auth check ho raha hai
    if (authentication && authStatus !== authentication) {
      // Agar route secure hai aur user login nahi hai 
      navigate("/login");
    } else if (!authentication && authStatus === true) {
      // Agar route public hai aur user already logged in hai 
      navigate("/");
    }
    setLoader(false); // Auth check complete hone ke baad loader hatao
  }, [authStatus, authentication, navigate]);

  // Loading animation jab tak auth check ho raha hai
  if (loader) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-xl text-gray-700 font-semibold">
        <div className="animate-spin w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full mb-3"></div>
        Checking authentication 🧭 ...
      </div>
    );
  }

  // Auth check complete hone ke baad children render karo
  return (
    <div
      className="animate-fadeIn min-h-screen flex justify-center items-center bg-gradient-to-br from-amber-50 to-yellow-100 p-6 transition-all duration-700"
      style={{ animation: "fadeIn 0.7s ease-in-out" }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;

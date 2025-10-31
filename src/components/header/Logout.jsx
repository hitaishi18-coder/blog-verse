import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth"; // ✅ Appwrite se logout call karega
import { logout } from "../../store/authSlice"; // ✅ Redux se user data remove
import toast from "react-hot-toast"; // ✅ Notification ke liye

function LogoutBtn() {
  // 🔁 Redux dispatch aur router navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🚪 Logout handler function
  const logoutHandler = async () => {
    try {
      // 🔹 Appwrite session destroy kar rahe hain
      await authService.logout();

      // 🔹 Redux state clear (logout action)
      dispatch(logout());

      // 🔹 Toast message for user feedback
      toast.success("Logged out successfully 👋");

      // 🔹 Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong while logging out ❌");
    }
  };

  return (
    // 🧭 Button with nice hover animation + glow effect
    <button
      onClick={logoutHandler}
      className="
        inline-flex items-center gap-2
        px-5 py-2.5
        bg-gradient-to-r from-red-400 to-pink-400
        text-white font-semibold
        rounded-b-lg shadow-md
        hover:shadow-lg hover:scale-105
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-pink-300
      "
    >
      🚪 Logout
    </button>
  );
}

export default LogoutBtn;

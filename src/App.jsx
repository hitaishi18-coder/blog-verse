//  Import kar rahe hain sab required cheezein
import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  // Loader dikhane ke liye state (jab tak user info fetch ho raha ho)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect: App load hote hi check karega user login hai ya nahi
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          //  Agar user login hai -> Redux store me data daal do
          dispatch(login(userData));
        } else {
          //  Agar login nahi hai -> logout kar do
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false)); //  Loader hatado jab process complete ho jaye
  }, [dispatch]);

  // 🌀 Jab tak data load ho raha ho -> ek cute loader dikhayenge
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="text-5xl animate-bounce mb-4">🌸</div>
        <h1 className="text-2xl font-semibold text-gray-700 animate-fadeIn">
          Loading... 
        </h1>

        {/* Inline animation style */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fadeIn {
              animation: fadeIn 2s ease-in-out infinite alternate;
            }
          `}
        </style>
      </div>
    );
  }

  //  Main layout return ho raha hai jab user ya to login hai ya check complete ho gaya
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-pink-50 to-blue-50 transition-all duration-500">
      {/*  Header hamesha top par */}
      <Header />

      {/*  Main content area — Outlet me sab nested routes load honge */}
      <main className="flex-grow p-4 animate-fadeUp">
        <Outlet />
      </main>

      {/*  Footer bottom par */}
      <Footer />

      {/* 🪄 Animation styles */}
      <style>
        {`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1.2s ease-in-out;
        }
        `}
      </style>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  // Navigation aur Redux dispatch setup
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  React Hook Form se input fields handle kar rahe hain
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  //  Login function — Appwrite ke through user authenticate karta hai
  const login = async (data) => {
    setError(""); //  Reset error before login attempt
    try {
      const session = await authService.login(data); // User login request
      if (session) {
        const userData = await authService.getCurrentUser(); // User info fetch

        if (userData) dispatch(authLogin(userData)); // Redux me user data save
        navigate("/"); // Redirect to Home page
      }
    } catch (error) {
      setError(error.message); // Error message show
    }
  };

  // UI with animations + emojis for friendly look
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div
        className="mx-auto w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 
        hover:shadow-blue-200 transition-all duration-300 ease-in-out"
      >
        {/* 🪪 Logo Section */}
        <div className="mb-4 flex justify-center items-center gap-2">
          <span className="inline-block w-full max-w-[100px] animate-bounce">
            <Logo width="100%" />
          </span>
          <span className="text-3xl">🔐</span>
        </div>

        {/* 🔤 Heading Section */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          Welcome Back! 👋
        </h2>
        <p className="text-center text-base text-gray-600 mb-6">
          Sign in to your account to continue
        </p>

        {/*  Link to Signup */}
        <p className="mt-2 text-center text-base text-black/60">
          Don’t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign Up 🪄
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {/*  Login Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* Email Field */}
            <Input
              label="Email "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />

            {/* Password Field */}
            <Input
              label="Password "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md transition-all duration-300"
            >
              Sign in 
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

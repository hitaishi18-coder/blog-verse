import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";

function Signup() {
  //  Hooks initialization
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  //  Signup logic — Appwrite ke through new user banata hai
  const createAccount = async (data) => {
    setError(""); // error reset
    try {
      // 🪄 User create karne ka request
      const user = await authService.createAccount(data);

      // Agar user create ho gaya → login bhi karwa do
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData)); // Redux store update
          navigate("/"); // Home pe redirect
        }
      }
    } catch (error) {
      setError(error.message); //  Error show if failed
    }
  };

  //  UI + animations + emoji styling
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-tr from-pink-50 via-white to-blue-50">
      <div
        className="mx-auto w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-gray-200
        hover:shadow-pink-200 transition-all duration-300 ease-in-out"
      >
        {/* Logo Section */}
        <div className="mb-4 flex justify-center items-center gap-2">
          <span className="inline-block w-full max-w-[100px] animate-bounce">
            <Logo width="100%" />
          </span>
          <span className="text-3xl">🪄</span>
        </div>

        {/*  Heading Section */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          Create your account 
        </h2>
        <p className="text-center text-base text-gray-600 mb-6">
          Let’s get you started on your writing journey 
        </p>

        {/*  Link to Login */}
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition-all duration-200 hover:underline"
          >
            Log in here 
          </Link>
        </p>

        {/*  Error Message */}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit(createAccount)} className="mt-8">
          <div className="space-y-5">
            {/* 🧍‍♀️ Name Field */}
            <Input
              label="Full Name 👤"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

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

            {/*  Password Field */}
            <Input
              label="Password "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            {/*  Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow-md transition-all duration-300"
            >
              Sign Up !
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

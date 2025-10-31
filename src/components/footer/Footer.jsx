//  Import kar rahe hain React aur required components
import React from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";

//  Footer Component – har page ke neeche dikhai deta hai
function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-pink-200 shadow-inner mt-10 transition-all duration-500">
      <Container>
        {/* Main footer content wrapper */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 text-center text-gray-700 gap-4 sm:gap-0">
          
          {/*  Left side – Logo + text */}
          <div className="flex items-center gap-2 text-xl font-bold text-pink-500">
            <Logo />
            <span className="animate-spin-slow text-yellow-400">🌸</span>
            <p className="text-gray-600 font-semibold">Made with ❤️ by Hitaishi</p>
          </div>

          {/*  Center – Navigation Links */}
          <div className="flex gap-6 text-md font-medium">
            <Link
              to="/"
              className="hover:text-pink-500 transition-all duration-300 hover:scale-110"
            >
              Home
            </Link>
            <Link
              to="/all-posts"
              className="hover:text-pink-500 transition-all duration-300 hover:scale-110"
            >
              Posts
            </Link>
            <Link
              to="/add-posts"
              className="hover:text-pink-500 transition-all duration-300 hover:scale-110"
            >
              Add Post
            </Link>
          </div>

          {/* Right – Copyright */}
          <div className="text-sm text-gray-600 mt-2 sm:mt-0">
            © {new Date().getFullYear()} <span className="font-semibold text-pink-600">BlogVerse</span> — All Rights Reserved 🌷
          </div>
        </div>
      </Container>

      {/* ✨ Inline Animation Style */}
      <style>
        {`
          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spinSlow 8s linear infinite;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;

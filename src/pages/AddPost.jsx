// Required imports
import React from "react";
import { Container, PostForm } from "../components";

//  Ye page ek new blog post add karne ke liye hai
// Isme hum Container component me PostForm render kar rahe hain
// PostForm ke andar actual form logic aur Appwrite connection hoga
function AddPost() {
  return (
    //  Page ke upar aur niche thoda space dene ke liye padding
    <div className="py-8 bg-gradient-to-b from-pink-50 via-white to-blue-50 animate-fade-in">
      <Container>
        {/* PostForm render — new post likhne ka form */}
        <div className="rounded-2xl shadow-lg border border-gray-200 p-6 bg-white hover:shadow-xl transition-all duration-300">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6 animate-bounce-slow">
             Add a New Blog Post
          </h1>
          <PostForm /> {/*  PostForm component use kar rahe hain */}
        </div>
      </Container>
    </div>
  );
}

export default AddPost;

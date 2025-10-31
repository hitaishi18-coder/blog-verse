import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((res) => {
        if (res) setPost(res);
        else navigate("/all-posts");
      });
    }
  }, [postId, navigate]);

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading post...
      </div>
    );

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <Container>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
           Edit Your Post
        </h1>
        <div className="shadow-lg rounded-2xl bg-white p-6 border border-gray-200">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;

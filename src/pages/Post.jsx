import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";

function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

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
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading post...
      </div>
    );

  const imageUrl = post.featuredimage
    ? appwriteService.getFilePreview(post.featuredimage)
    : null;

  console.log("🖼 Image preview URL:", imageUrl);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await appwriteService.deletePost(postId);
      navigate("/all-posts");
    }
  };

  const handleEdit = () => navigate(`/edit-post/${postId}`);

  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-blue-50 via-white to-pink-50 min-h-screen">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full max-w-3xl h-80 object-cover rounded-lg shadow-md mb-8"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

      {/*  Corrected parse() usage */}
      <div className="text-gray-700 max-w-3xl leading-relaxed">
        {parse(post.content)}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleEdit}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default Post;

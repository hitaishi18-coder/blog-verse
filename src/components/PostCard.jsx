import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredimage }) {
  const imageUrl = featuredimage
    ? appwriteService.getFilePreview(featuredimage)
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-72">
      <Link to={`/post/${$id}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 hover:text-gray-900 transition">
            {title || "Untitled Post"}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;

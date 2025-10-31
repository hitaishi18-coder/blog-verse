import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import PostCard from "../components/PostCard";
import { Container } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //  Fetch posts only once on mount
    appwriteService.getPosts().then((result) => {
      if (result && result.documents) {
        console.log("Posts fetched from Appwrite:", result);
        setPosts(result.documents);
      }
    });
  }, []); //  Empty dependency ensures no re-runs

  if (!posts.length)
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        No posts available 
      </div>
    );

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          📝 All Posts
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredimage={post.featuredimage}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;

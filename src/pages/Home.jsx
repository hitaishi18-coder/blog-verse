import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux"; //  Redux se login status lene ke liye

function Home() {
  //  State to store fetched posts
  const [posts, setPosts] = useState([]);

  //  Redux store se auth status lena (user login hai ya nahi)
  const authStatus = useSelector((state) => state.auth.status);

  //  Component mount hone ke baad posts fetch karte hain (agar user logged in hai)
  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts().then((posts) => {
        if (posts) setPosts(posts.documents);
      });
    }
  }, [authStatus]);

  //  Agar user logged in nahi hai, friendly message dikhate hain
  if (!authStatus) {
    return (
      <div className="w-full py-16 mt-10 text-center bg-gradient-to-b from-pink-50 via-white to-blue-50 animate-fade-in">
        <Container>
          <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <h1 className="text-3xl font-bold text-gray-700">
              Please Login to Read Amazing Blogs 
            </h1>
            <p className="text-gray-500">
               Join our creative community and start exploring inspiring posts!
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // 💤 Agar user login hai but koi post nahi hai
  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-gradient-to-b from-blue-50 via-white to-pink-50 animate-fade-in">
        <Container>
          <h2 className="text-2xl text-gray-600 font-semibold">
             No posts available yet — be the first to add one!
          </h2>
        </Container>
      </div>
    );
  }

  //  Agar posts available hain, toh unhe grid me render karte hain
  return (
    <div className="w-full py-10 bg-gradient-to-b from-blue-50 via-white to-pink-50 animate-slide-up">
      <Container>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 animate-bounce-slow">
          📝 Latest Posts
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-4 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] bg-white shadow-md rounded-xl hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

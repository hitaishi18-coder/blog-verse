import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import Signup from "./pages/Signup.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPost.jsx";

// Components
import { AuthLayout, Login } from "./components/index.js";

//  Create Browser Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      // 🔹 Login & Signup
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      // 🔹 All Posts
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },

      // 🔹 Add Post
      {
        path: "/add-posts",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },

      // 🔹 View Post — uses $id from Appwrite
      {
        path: "/post/:postId",
        element: <Post />,
      },

      // 🔹 Edit Post — uses $id too
      {
        path: "/edit-post/:postId",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);

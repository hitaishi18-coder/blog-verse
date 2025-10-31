📝 React + Appwrite Blog App

https://blog-verse-omega-beryl.vercel.app/

A simple blog application built using React, Redux, and Appwrite — allowing users to create, edit, view, and delete posts with image uploads.

🚀 Features

🔐 User Authentication (Login / Signup)

🖼 Upload images using Appwrite Storage

✍️ Create, Edit, and Delete Posts

📄 View All Posts in a clean UI

🗃 Managed with Redux Store and React Router

⚙️ Tech Stack

Frontend: React, Redux, React Router

Backend: Appwrite (Database + Auth + Storage)

Styling: Tailwind CSS

Notifications: React Hot Toast

🧩 Folder Structure
src/
 ┣ components/
 ┣ pages/
 ┣ appwrite/
 ┣ store/
 ┣ config/
 ┗ App.jsx

🔧 Setup Instructions

Clone this repository

git clone https://github.com/hitaishi18-coder/react-appwrite-blog.git


Install dependencies

npm install


Setup Appwrite Project and add these env variables in .env

VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id


Run the app

npm run dev

📸 Preview

Home Page: Displays all posts

Add Post: Create new blog with image

Edit/Delete: Manage your own posts

👩‍💻 Author

Hitaishi Lohtia
🧡 Made with React + Appwrite

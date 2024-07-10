// src/App.jsx

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
// Auth Components
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";

// Blog Components
import Blogs from "./components/Blogs";
import BlogsFollowing from "./components/Blogs/BlogsFollowing";
import CreateBlog from "./components/Blogs/CreateBlog";
import MyBlogs from "./components/Blogs/MyBlogs";
import ShowBlog from "./components/Blogs/ShowBlog";

// Wine Components
import Wines from "./components/Wines";
import ShowWine from "./components/Wines/ShowWine";

// Critic Components
import Critics from "./components/Critics";
import ShowCritic from "./components/Critics/ShowCritic";

// Room Components
import Rooms from "./components/Rooms";
import ShowRoom from "./components/Rooms/ShowRoom";

// Event Components
import Events from "./components/Events";
import ShowEvent from "./components/Events/ShowEvent";

// Spirit Components
import Spirits from "./components/Spirits";
import ShowSpirits from "./components/Spirits/ShowSpirits";
import useAuthContext from "./context/blog/auth/useAuthContext";

/////////////////////
// App Component
///////////////////
const App = () => {
  const { user } = useAuthContext();

  //////////////////////////////////////////
  // If no user, show landing, signup, signin
  //////////////////////////////////////////
  if (!user) {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
        </Routes>
      </>
    );
  }

  /////////////////////
  // Main App Routes
  /////////////////////
  return (
    <>
      <NavBar />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard */}
        <Route path="/dashboard/:userId" element={<Dashboard />} />

        {/* Signup */}
        <Route path="/signup" element={<SignupForm />} />

        {/* Signin */}
        <Route path="/signin" element={<SigninForm />} />

        {/* User Profile */}
        <Route path="/profile/:userId" element={<ProfilePage />} />

        {/* Blogs */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/following" element={<BlogsFollowing />} />
        <Route path="/blogs/new" element={<CreateBlog />} />
        <Route path="/blogs/my-blogs" element={<MyBlogs />} />
        <Route path="/blogs/:blogId" element={<ShowBlog />} />

        {/* Wines */}
        <Route path="/wines" element={<Wines />} />
        <Route path="/wines/:wineId" element={<ShowWine />} />

        {/* Critics */}
        <Route path="/critics" element={<Critics />} />
        <Route path="/critics/:criticId" element={<ShowCritic />} />

        {/* Rooms */}
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:roomId" element={<ShowRoom />} />

        {/* Events */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<ShowEvent />} />

        {/* Spirits */}
        <Route path="/spirits" element={<Spirits />} />
        <Route path="/spirits/:spiritId" element={<ShowSpirits />} />
      </Routes>
    </>
  );
};

export default App;

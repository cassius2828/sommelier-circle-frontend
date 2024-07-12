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
import ExploreBlogs from "./components/Blogs/ExploreBlogs";
import BlogsFollowing from "./components/Blogs/BlogsFollowing";
import BlogManager from "./components/Blogs/BlogManager";
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
import useAuthContext from "./context/auth/useAuthContext";
import Header from "./components/Header";


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
      <Header/>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth/signup" element={<SignupForm />} />
          <Route path="auth/signin" element={<SigninForm />} />
        </Routes>
      </>
    );
  }

  /////////////////////
  // Main App Routes
  /////////////////////
  return (
    <>
      <Header/>
      <NavBar />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard */}
        <Route path="/dashboard/:userId" element={<Dashboard />} />

        {/* Signup */}
        <Route path="auth/signup" element={<SignupForm />} />

        {/* Signin */}
        <Route path="auth/signin" element={<SigninForm />} />

        {/* User Profile */}
        <Route path="/profile/:userId" element={<ProfilePage />} />

        {/* Blogs */}
        <Route path="/blogs/explore" element={<ExploreBlogs />} />
        <Route path="/blogs/following" element={<BlogsFollowing />} />
        <Route path="/blogs/new" element={<BlogManager />} />
        <Route path={`/blogs/user-blogs/:userId`} element={<MyBlogs />} />
        <Route path="/blogs/:blogId" element={<ShowBlog />} />
        <Route path="/blogs/:blogId/edit" element={<BlogManager />} />

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

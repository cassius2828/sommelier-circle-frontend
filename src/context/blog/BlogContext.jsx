/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../auth/useAuthContext";
import useGlobalContext from "../global/useGlobalContext";

///////////////////////////////
// Context Creation
//////////////////////////////

export const BlogContext = createContext();

///////////////////////////////
// Blog Provider Component
//////////////////////////////

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [landingBlogs, setLandingBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const { setIsLoading } = useGlobalContext();
  const { user } = useAuthContext();

  ///////////////////////////////
  // Fetch Current User Blogs
  ///////////////////////////////

  const fetchCurrentUserBlogs = async () => {
    setIsLoading(true);

    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs/user-blogs/${user._id}`,
        options
      );
      setMyBlogs(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////
  // Fetch All Blogs
  ///////////////////////////////

  const fetchAllBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs`
      );
      setBlogs(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////
  // Fetch Blog Ids (for blog nav)
  ///////////////////////////

  const fetchBlogIds = async () => {
     await fetchAllBlogs()
     const blogIdList = blogs.map(blog => blog._id);
     console.log(blogIdList, ' <-- blog is list')
     return blogIdList
  }

  ///////////////////////////////
  // Fetch Landing Blogs
  ///////////////////////////////

  const fetchLandingBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs/landing`
      );
      setLandingBlogs(response.data);
    
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////ƒ
  // useEffect for Fetching Blogs
  ///////////////////////////////

  useEffect(() => {
    // fetchAllBlogs();
    fetchLandingBlogs();
    fetchCurrentUserBlogs();
  }, []);

  ///////////////////////////////
  // Return Provider
  ///////////////////////////////

  return (
    <BlogContext.Provider
      value={{
        blogs,
        setBlogs,
        myBlogs,
        fetchAllBlogs,
        fetchCurrentUserBlogs,
        fetchLandingBlogs,
        landingBlogs,fetchBlogIds
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "./auth/useAuthContext";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    // const fetchAllBlogs = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3000/blogs");
    //     setBlogs(response.data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchCurrentUserBlogs = async () => {
      try {
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:3000/blogs/user-blogs/${user._id}`,
          options
        );
        setMyBlogs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // fetchAllBlogs();
    fetchCurrentUserBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        setBlogs,
        loading,
        error,
        myBlogs,
        // fetchAllBlogs,
        // fetchCurrentUserBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

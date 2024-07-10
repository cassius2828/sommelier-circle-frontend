/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blogs');
        setBlogs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserBlogs = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/blogs/user-blogs/${user._id}`);
          setBlogs(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    fetchAllBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};

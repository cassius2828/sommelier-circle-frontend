import { createContext, useState, useEffect } from "react";
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
  const [showBlog, setShowBlog] = useState({});
  const [communityBlogs, setCommunityBlogs] = useState([]);
  const [styleBlogs, setStyleBlogs] = useState([]);
  const [landingBlogs, setLandingBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  // context
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
  // Fetch Community Blog Ids (for blog nav)
  ///////////////////////////

  const fetchCommunityBlogIds = async () => {
    await fetchAllBlogs();
    const blogIdList = blogs.map((blog) => blog._id);

    setCommunityBlogs(blogIdList);
    return blogIdList;
  };

  ///////////////////////////
  // Fetch Style Blog Ids (for blog nav)
  ///////////////////////////
  const fetchStyleBlogPaths = async (array) => {
    // set style blog list to whatever the current page is rendering on the side menu
    const blogPathsArray = array.map((blog) => blog.path);
    setStyleBlogs(blogPathsArray);
  };

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
        landingBlogs,
        fetchCommunityBlogIds,
        fetchStyleBlogPaths,
        communityBlogs,
        styleBlogs,
        showBlog,
        setShowBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

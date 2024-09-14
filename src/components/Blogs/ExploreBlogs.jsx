import { useState, useEffect } from "react";
// context
import useBlogContext from "../../context/blog/useBlogContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// components
import DisplayBlogs from "./DisplayBlogs";
import Loader from "../CommonComponents/Loader";

const ExploreBlogs = () => {
  const { blogs, fetchAllBlogs } = useBlogContext();
  const { scrollToTop, isLoading } = useGlobalContext();
  const [display, setDisplay] = useState("full");

  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  // fetch blogs on render
  useEffect(() => {
    fetchAllBlogs();
    scrollToTop();
  }, []);

  if (isLoading) return <Loader />;

  console.log(blogs);
  return (
    <DisplayBlogs
      title="Explore Blogs"
      display={display}
      handleDisplayChange={handleDisplayChange}
      blogs={blogs}
    />
  );
};

export default ExploreBlogs;

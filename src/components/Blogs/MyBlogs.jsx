import { useState, useEffect } from "react";
import useBlogContext from "../../context/blog/useBlogContext";

import { useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import DisplayBlogs from "./DisplayBlogs";

const MyBlogs = () => {
  const [display, setDisplay] = useState("list");
  // context
  const { myBlogs, fetchCurrentUserBlogs } = useBlogContext();
  const { isLoading } = useGlobalContext();
  // hooks
  const { userId } = useParams();
  // vars
  const windowWidth = window.innerWidth;
  ///////////////////////////
  // Handle Display Change
  ///////////////////////////
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  ///////////////////////////
  // Fetch Current User Blogs
  ///////////////////////////
  useEffect(() => {
    fetchCurrentUserBlogs();
    if (windowWidth < 768) {
      setDisplay("full");
    }
  }, [userId]);

  if (isLoading) return <Loader />;

  return (
    <DisplayBlogs
      title="My Blogs"
      display={display}
      handleDisplayChange={handleDisplayChange}
      blogs={myBlogs}
    />
  );
};

export default MyBlogs;

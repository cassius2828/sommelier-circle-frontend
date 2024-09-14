import { useState, useEffect } from "react";
import useBlogContext from "../../context/blog/useBlogContext";
import Blog from "./Blog";
import {
  BlogTable,
  MultipleBlogsFull,
  MultipleBlogsList,
} from "./MultipleBlogs";
import { useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import DisplayBlogs from "./DisplayBlogs";

const MyBlogs = () => {
  const { myBlogs, setMyBlogs, fetchCurrentUserBlogs } = useBlogContext();
  const { isLoading } = useGlobalContext();
  const [display, setDisplay] = useState("list");
  const { userId } = useParams();
  const windowWidth = window.innerWidth;
  console.log(userId);
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };
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

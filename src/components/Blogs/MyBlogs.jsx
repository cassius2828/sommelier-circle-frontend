import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// context
import useBlogContext from "../../context/blog/useBlogContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// components
import Loader from "../CommonComponents/Loader";
import DisplayBlogs from "./DisplayBlogs";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import useAuthContext from "../../context/auth/useAuthContext";
import NoContentFound from "../CommonComponents/NoContentFound";

const MyBlogs = () => {
  const [display, setDisplay] = useState("list");
  // context
  const { myBlogs, fetchCurrentUserBlogs } = useBlogContext();
  const { isLoading } = useGlobalContext();
  const { user } = useAuthContext();

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
    if (!user) return;
    fetchCurrentUserBlogs();
    if (windowWidth < 768) {
      setDisplay("full");
    }
  }, [userId]);

  if (isLoading) return <Loader />;
  if (!user)
    return (
      <>
        <PromptSignIn subject={"Your Blogs"} />
      </>
    );
  if (myBlogs.length < 1)
    return (
      <NoContentFound
        subject={"blogs"}
        message='Create your first blog by visiting "create a blog"!'
      />
    );
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

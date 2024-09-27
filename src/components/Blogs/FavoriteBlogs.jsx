import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
// service
import { getFavoriteItems } from "../../services/favoritesService";
// components
import Loader from "../CommonComponents/Loader";
import DisplayBlogs from "./DisplayBlogs";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import useAuthContext from "../../context/auth/useAuthContext";
import NoContentFound from "../CommonComponents/NoContentFound";

const FavoriteBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState("list");
  // hooks
  const { userId } = useParams();
  const { scrollToTop } = useGlobalContext();
  const { user, fetchTargetUser, displayTargetedUsername } = useAuthContext();

  // vars

  const windowWidth = window.innerWidth;
  ///////////////////////////
  // Handle Display Change
  ///////////////////////////
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  ///////////////////////////
  // Fetch Blogs On Load | Scroll to top | Default display to full on mobile
  ///////////////////////////
  useEffect(() => {
    const fetchFavoriteBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await getFavoriteItems(userId, "blogs");
        setBlogs(data);
        fetchTargetUser(userId);
      } catch (err) {
        console.error(err);
        console.log(`Unable to retrieve user's favorite blogs`);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteBlogs();
    scrollToTop();
    if (windowWidth < 768) {
      setDisplay("full");
    }
  }, []);

  if (isLoading || blogs === null) return <Loader />;
  if (!user && !isLoading)
    return (
      <>
        <PromptSignIn subject={"Favorite Blogs"} />
      </>
    );
  if (blogs.length < 1)
    return (
      <NoContentFound
        subject={"blogs"}
        message='Create your first blog by visiting "create a blog"!'
      />
    );

  return (
    <DisplayBlogs
      title={`${displayTargetedUsername || ""} Favorite Blogs`}
      display={display}
      handleDisplayChange={handleDisplayChange}
      blogs={blogs}
    />
  );
};

export default FavoriteBlogs;

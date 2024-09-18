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

const FavoriteBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState("list");
  // hooks
  const { userId } = useParams();
  const { scrollToTop } = useGlobalContext();
  const { user } = useAuthContext();

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
    if (!user) return;
    const fetchFavoriteBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await getFavoriteItems(userId, "blogs");
        console.log(data, " favorite blogs");
        setBlogs(data);
      } catch (err) {
        console.error(err);
        console.log(`Unable to retrieve user's favorite blogs`);
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

  if (isLoading) return <Loader />;
  if (!user)
    return (
      <>
        <PromptSignIn subject={"Favorite Blogs"} />
      </>
    );

  return (
    <DisplayBlogs
      title="Favorite Blogs"
      display={display}
      handleDisplayChange={handleDisplayChange}
      blogs={blogs}
    />
  );
};

export default FavoriteBlogs;

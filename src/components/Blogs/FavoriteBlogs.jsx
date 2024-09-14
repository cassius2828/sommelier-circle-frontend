import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import DisplayBlogs from "./DisplayBlogs";
import { getFavoriteItems } from "../../services/favoritesService";

const FavoriteBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { userId } = useParams();
  const { scrollToTop } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState("list");
  const windowWidth = window.innerWidth;
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  // fetch blogs on render
  useEffect(() => {
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

  console.log(blogs);
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

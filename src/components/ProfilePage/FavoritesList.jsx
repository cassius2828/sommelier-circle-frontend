import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// services
import {
  getFavoriteItems,
  getLocationsFavoriteItems,
} from "../../services/favoritesService";
import { FavoritesLink } from "./FavoritesLink";
// inital favorites
const initialFavorites = {
  wines: [],
  blogs: [],
  critics: [],
  locations: [],
  events: [],
};
const FavoritesList = () => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [isLoading, setIsLoading] = useState(false);
  // hooks
  const { userId } = useParams();

  ///////////////////////////
  // Handle Set Local Favorites
  ///////////////////////////
  const handleSetLocalFavorites = async (name, value) => {
    //  if the backend returns a message explaining there is no favorites, then ensure we set an empty array
    if (typeof value === "string") {
      setFavorites((prev) => ({ ...prev, [name]: [] }));
    } else setFavorites((prev) => ({ ...prev, [name]: value }));
  };
  ///////////////////////////
  // Fetch Favorite Item
  ///////////////////////////
  const fetchFavoriteItem = async (name) => {
    try {
      const data = await getFavoriteItems(userId, name);
      await handleSetLocalFavorites(name, data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to retrieve favorite ${name}`);
    }
  };

  ///////////////////////////
  // Fetch Favorite Locations
  ///////////////////////////
  const fetchFavoriteLocations = async () => {
    try {
      const data = await getLocationsFavoriteItems(userId);
      await handleSetLocalFavorites("locations", data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to retrieve favorite locations`);
    }
  };
  ///////////////////////////
  // Fetch All Favorites
  ///////////////////////////
  const fetchAllFavorites = async () => {
    setIsLoading(true);
    try {
      await fetchFavoriteItem("blogs");
      await fetchFavoriteItem("critics");
      await fetchFavoriteItem("events");
      await fetchFavoriteItem("wines");
      await fetchFavoriteLocations("locations");
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch all of the user's favorite items`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllFavorites();
  }, [userId]);
  return (
    <div className="col-start-1 col-span-1 row-start-1 w-3/4 mx-12 max-w-[50rem] rounded-md">
      <h2 className="text-5xl p-3 text-gray-100 bg-neutral-900 border-b">
        Favorites
      </h2>
      {isLoading ? (
        <h3 className="bg-neutral-900  text-gray-100 text-3xl p-4 min-h-[20rem]">
          loading...
        </h3>
      ) : (
        <ul className="w-full flex flex-col justify-start items-start">
          <FavoritesLink
            count={favorites.blogs?.length}
            label="Blogs"
            path={`/favorites/blogs/${userId}`}
          />
          <FavoritesLink
            count={favorites.critics?.length}
            label="Critics"
            path={`/favorites/critics/${userId}`}
          />
          <FavoritesLink
            count={favorites.events?.length}
            label="Events"
            path={`/favorites/events/${userId}`}
          />
          <FavoritesLink
            count={favorites.locations?.length}
            label="Locations"
            path={`/favorites/locations/${userId}`}
          />
          <FavoritesLink
            count={favorites.wines?.length}
            label="Wines"
            path={`/favorites/wines/${userId}`}
          />
        </ul>
      )}
    </div>
  );
};
export default FavoritesList;

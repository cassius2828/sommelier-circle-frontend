import { useEffect, useState } from "react";
import {
  getFavoriteItems,
  getLocationsFavoriteItems,
} from "../../services/favoritesService";
import useAuthContext from "../../context/auth/useAuthContext";
import { Link, useParams } from "react-router-dom";
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
  const { userId } = useParams();
  const handleSetLocalFavorites = async (name, value) => {
    setFavorites((prev) => ({ ...prev, [name]: value }));
  };
  // TODO: The way i am trying to update all of these at the same time is wrong

  const fetchFavoriteItem = async (name) => {
    try {
      const data = await getFavoriteItems(userId, name);
      await handleSetLocalFavorites(name, data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to retrieve favorite ${name}`);
    }
  };

  const fetchFavoriteLocations = async () => {
    try {
      const data = await getLocationsFavoriteItems(userId);
      await handleSetLocalFavorites("locations", data);
      console.log(
        data,
        "===================\n <-- favorite locations from server \n ===================="
      );
    } catch (err) {
      console.error(err);
      console.log(`Unable to retrieve favorite locations`);
    }
  };
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
    // console.log(favorites)
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
          <Link
            className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
            to={`/favorites/blogs/${userId}`}
          >
            <li className="">Blogs: {favorites.blogs?.length || 0}</li>
          </Link>
          <Link
            className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
            to={`/favorites/critics/${userId}`}
          >
            <li className="">Critics: {favorites.critics?.length || 0}</li>
          </Link>
          <Link
            className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
            to={`/favorites/events/${userId}`}
          >
            <li className="">Events: {favorites.events?.length || 0}</li>{" "}
          </Link>
          <Link
            className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
            to={`/favorites/locations/${userId}`}
          >
            <li className="">Locations: {favorites.locations?.length || 0}</li>
          </Link>
          <Link
            className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
            to={`/favorites/wines/${userId}`}
          >
            <li className="">Wines: {favorites.wines?.length || 0}</li>
          </Link>
        </ul>
      )}
    </div>
  );
};
export default FavoritesList;

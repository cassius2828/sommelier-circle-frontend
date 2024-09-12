import { useEffect, useState } from "react";
import { getFavoriteItems } from "../../services/favoritesService";
import useAuthContext from "../../context/auth/useAuthContext";
import { Link } from "react-router-dom";
const initialFavorites = {
  wines: [],
  blogs: [],
  critics: [],
  locations: [],
  events: [],
};
const FavoritesList = () => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const { user } = useAuthContext();
  const handleSetLocalFavorites = async (name, value) => {
    setFavorites((prev) => ({ ...prev, [name]: value }));
  };
  // TODO: The way i am trying to update all of these at the same time is wrong

  const fetchFavoriteItem = async (name) => {
    try {
      const data = await getFavoriteItems(user._id, name);
      await handleSetLocalFavorites(name, data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to retrieve ${user.username}'s favorite ${name}`);
    }
  };
  const fetchAllFavorites = async () => {
    await fetchFavoriteItem("blogs");
    await fetchFavoriteItem("critics");
    await fetchFavoriteItem("events");
    // await fetchFavoriteItem('locations')
    await fetchFavoriteItem("wines");
  };
  useEffect(() => {
    fetchAllFavorites();
    // console.log(favorites)
  }, []);
  return (
    <div className="col-start-1 col-span-1 row-start-1 w-3/4 mx-12 max-w-[50rem] rounded-md">
      <h2 className="text-5xl p-3 text-gray-100 bg-neutral-900 border-b">
        Favorites
      </h2>
      <ul className="w-full flex flex-col justify-start items-start">
        <Link
          className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
          to={`/favorites/blogs/${user._id}`}
        >
          <li className="">
            Blogs: {favorites.blogs ? favorites.blogs.length : "loading..."}
          </li>
        </Link>
        <Link
          className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
          to={`/favorites/critics/${user._id}`}
        >
          <li className="">
            Critics:{" "}
            {favorites.critics ? favorites.critics.length : "loading..."}
          </li>
        </Link>
        <Link
          className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
          to={`/favorites/events/${user._id}`}
        >
          <li className="">
            Events: {favorites.events ? favorites.events.length : "loading..."}
          </li>{" "}
        </Link>
        <Link
          className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
          to={`/favorites/locations/${user._id}`}
        >
          <li className="">
            Locations:{" "}
            {favorites.locations ? favorites.locations.length : "loading..."}
          </li>
        </Link>
        <Link
          className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
          to={`/favorites/wines/${user._id}`}
        >
          <li className="">
            Wines: {favorites.wines ? favorites.wines.length : "loading..."}
          </li>
        </Link>
      </ul>
    </div>
  );
};
export default FavoritesList;

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import { getFavoriteItems } from "../../services/favoritesService";
import LocationsTableList from "./LocationsTableList";

const FavoriteLocations = () => {
  const [locations, setLocations] = useState([]);
  const { userId } = useParams();
  const { scrollToTop } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const favoriteRooms = [];

  // fetch locations on render
  useEffect(() => {
    const fetchFavoriteLocations = async () => {
      setIsLoading(true);
      try {
        const data = await getFavoriteItems(userId, "locations");
        console.log(data, " favorite locations");
        setLocations(data);
      } catch (err) {
        console.error(err);
        console.log(`Unable to retrieve user's favorite locations`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteLocations();
    scrollToTop();
  }, []);

//   if (isLoading) return <Loader />;

  console.log(locations);
  return <LocationsTableList rooms={favoriteRooms} />;
};

export default FavoriteLocations;

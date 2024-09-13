import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import {
  getFavoriteItems,
  getLocationsFavoriteItems,
} from "../../services/favoritesService";
import LocationsTableList from "./LocationsTableList";
import { getPhotosOfLocation } from "../../services/googlePlacesService";
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../utils/indexedDB.config";

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
      const cachedUserFavoriteLocations = await getItemIndexedDB(
        `fav-locations-${userId}`,
        "locations"
      );
      if (cachedUserFavoriteLocations) {
        setLocations(cachedUserFavoriteLocations);
        setIsLoading(false);
        return;
      }
      try {
        const data = await getLocationsFavoriteItems(userId, "locations");
        const updatedLocationsWithCoverPhoto = await Promise.all(
          data.map(async (location) => {
            const photo = await getPhotosOfLocation(
              location.result.photos[0].photo_reference
            );
            return { ...location.result, photo };
          })
        );

        setLocations(updatedLocationsWithCoverPhoto);
        await setItemIndexedDB(
          `fav-locations-${userId}`,
          updatedLocationsWithCoverPhoto,
          "locations"
        );
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

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="text-6xl text-gray-100 mt-80 mb-20 text-center">
        Favorite Locations
      </h1>
      <LocationsTableList rooms={locations} />
    </>
  );
};

export default FavoriteLocations;

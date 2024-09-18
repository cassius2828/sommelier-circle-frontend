import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
// services
import { getLocationsFavoriteItems } from "../../services/favoritesService";
import { getPhotosOfLocation } from "../../services/googlePlacesService";
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../utils/indexedDB.config";
// components
import Loader from "../CommonComponents/Loader";
import LocationsTableList from "./LocationsTableList";
import PromptSignIn from "../CommonComponents/PromptSignIn";

const FavoriteLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const { scrollToTop } = useGlobalContext();

  ///////////////////////////
  // fetch locations on render
  ///////////////////////////
  useEffect(() => {
    if (userId === 'undefined') return;
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
        // add photo key to obj
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
  if (userId === 'undefined')
    return (
      <>
        <PromptSignIn subject={'Favorite Locations'}/>
      </>
    );
  return (
    <>
      <h1 className="text-6xl text-gray-100 pt-12 mt-52 md:mt-80 mb-20 text-center">
        Favorite Locations
      </h1>
      <LocationsTableList rooms={locations} />
    </>
  );
};

export default FavoriteLocations;

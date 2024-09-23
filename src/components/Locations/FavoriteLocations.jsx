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
import NoContentFound from "../CommonComponents/NoContentFound";
import useAuthContext from "../../context/auth/useAuthContext";

const FavoriteLocations = () => {
  const [locations, setLocations] = useState(null);
  const { userId } = useParams();
  const { scrollToTop, isLoading, setIsLoading } = useGlobalContext();
  const { displayTargetedUsername } = useAuthContext();

  ///////////////////////////
  // fetch locations on render
  ///////////////////////////
  useEffect(() => {
    if (userId === "undefined") return;
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

  if (isLoading || locations === null) return <Loader />;
  if (userId === "undefined")
    return (
      <>
        <PromptSignIn subject={"Favorite Locations"} />
      </>
    );
  if (locations.length < 1)
    return (
      <NoContentFound
        subject={"locations"}
        message='Add your favorite locations by visiting "explore locations" and selecting the star.'
      />
    );
  return (
    <>
      <h1 className="text-6xl text-gray-100 pt-12 mt-52 md:mt-80 mb-20 text-center">
        {`${displayTargetedUsername || ""} Favorite Locations`}
      </h1>
      <LocationsTableList rooms={locations} />
    </>
  );
};

export default FavoriteLocations;

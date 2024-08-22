/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import {
  getNearbyWinePlaces,
  getPhotosOfLocation,
} from "../../services/googlePlacesService";
import useGlobalContext from "../global/useGlobalContext";

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [locationDetails, setLocationDetails] = useState({});
  // const [events, setEvents] = useState([]);
  // const [eventDetails, setEventDetails] = useState({});
  const { isLoading, setIsLoading } = useGlobalContext();

  const fetchLocationsWithCoverPhoto = async () => {
    setIsLoading(true);
    try {
      const locationList = await getNearbyWinePlaces();
      const updatedPlacesWithPhoto = await Promise.all(
        locationList.map(async (location) => {
          if (location.photos[0].photo_reference) {
            const photo = await getPhotosOfLocation(location.photos[0].photo_reference);
            return { ...location, photo };
          }
          return location;
        })
      );
      console.log(updatedPlacesWithPhoto, ' <-- updatedPlaces')
      setLocations(updatedPlacesWithPhoto);
      console.log(locations);
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch locations from google places api | Before service file`
      );
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchLocationsWithCoverPhoto();
  }, []);

  // const fetchLocationDetails = async () => {
  //   try {
  //     console.log("fetching location details ");
  //   } catch (err) {
  //     console.error(err);
  //     console.log(
  //       `Unable to fetch location details from google place details api | Before service file`
  //     );
  //   }
  // };

  return (
    <PlacesContext.Provider
      value={{  locations, locationDetails }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

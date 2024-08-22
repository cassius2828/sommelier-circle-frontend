/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from "react";

import {
  getNearbyWinePlaces,
  getPhotosOfLocation,
  getPlaceDetails,
} from "../../services/googlePlacesService";
import useGlobalContext from "../global/useGlobalContext";

export const PlacesContext = createContext();

const initialState = {
  locations: [],
  locationDetails: {
    fetchedPhotos: [],
  },
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    // loading
    case "startLoading/locations":
      return { ...state, isLoading: true };
    case "stopLoading/locations":
      return { ...state, isLoading: false };
    // set locations
    case "setLocations/locations":
      // console.log(action.payload, ' action  payoload')
      return { ...state, locations: action.payload };
    case "setLocationDetails/locations":
      return { ...state, locationDetails: action.payload };
    case "setPlaceDetails/locations":
      // console.log(action.payload, ' <-- action.payload')
      return {
        ...state,
        locationDetails: {
          fetchedPhotos: action.payload.photos,
          ...action.payload.data,
        },
      };

    default:
      return state;
  }
};

export const PlacesProvider = ({ children }) => {
  const [{ locations, locationDetails, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [events, setEvents] = useState([]);
  // const [eventDetails, setEventDetails] = useState({});
  // ! Go to where isLoading is used for location specific events and change them to use
  // ! isLoading from this context

  const windowWidth = window.innerWidth;
  let deviceWidth = "";

  switch (deviceWidth) {
    case windowWidth < 768:
      deviceWidth = "mobile";
      break;
    case windowWidth > 1400:
      deviceWidth = "desktop";
      break;

    default:
      deviceWidth = "tablet";
      break;
  }
  const fetchLocationsWithCoverPhoto = async () => {
    dispatch({ type: "startLoading/locations" });
    try {
      const locationList = await getNearbyWinePlaces();
      const updatedPlacesWithPhoto = await Promise.all(
        locationList.map(async (location) => {
          if (location.photos[0].photo_reference) {
            const photo = await getPhotosOfLocation(
              location.photos[0].photo_reference
            );
            return { ...location, photo };
          }
          return location;
        })
      );
      // console.log(updatedPlacesWithPhoto, " <-- updatedPlaces");
      dispatch({
        type: "setLocations/locations",
        payload: updatedPlacesWithPhoto,
      });

      console.log(locations);
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch locations from google places api | Before service file`
      );
    } finally {
      dispatch({ type: "stopLoading/locations" });
    }
  };

  ///////////////////////////
  // Fetch Place Details and Photos
  ///////////////////////////
  const fetchPlaceDetails = async (locationId) => {
    try {
      dispatch({ type: "startLoading/locations" });

      const data = await getPlaceDetails(locationId);
// console.log(data, ' <-- data for photo refs')
      //  asynchronously fetch photos
      const photoReferences = data?.photos.map(
        (photo) => photo.photo_reference
      );
      const photoPromises = photoReferences.map((photo_ref) =>
        fetchLocationPhotos(photo_ref)
      );
      const photoResults = await Promise.all(photoPromises);
      // console.log(photoResults, ' <-- photo results after going thorugh fetchLocation Photos')
      // set state data
      // setPhotos(photoResults);
      // dispatch({type:'setPlaceDetailPhotos/locations', payload: photoResults})
      // setPlaceDetails(data);
      // console.log(photoResults, ' <-- photo results')
      // console.log(data, ' <-- data')
      // console.log(reducer, ' <-- data')
      dispatch({
        type: "setPlaceDetails/locations",
        payload: { photos: photoResults, data },
      });
    } catch (err) {
      console.error(err);
      console.log(
        `Error communicating with backend to retrieve place details from google place api`
      );
    } finally {
      dispatch({ type: "stopLoading/locations" });
    }
  };
  ///////////////////////////
  // Fetch Location Photos function
  ///////////////////////////
  const fetchLocationPhotos = async (photo_reference) => {
    try {
      const data = await getPhotosOfLocation(photo_reference, deviceWidth);
      if (!locationDetails.fetchedPhotos.includes(data)) {
        return data;
      }
    } catch (err) {
      console.error(err);
      console.log(
        `Error communicating with backend to retrieve place photos from google place api`
      );
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
    <PlacesContext.Provider value={{ locations, locationDetails, isLoading,fetchPlaceDetails }}>
      {children}
    </PlacesContext.Provider>
  );
};

import { createContext, useReducer } from "react";
// services
import {
  getNearbyWinePlaces,
  getPhotosOfLocation,
  getPlaceDetails,
} from "../../services/googlePlacesService";
// indexedDB
import {
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../utils/indexedDB.config";

export const PlacesContext = createContext();
// initial state
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
      return { ...state, locations: action.payload };
    case "setLocationDetails/locations":
      return { ...state, locationDetails: action.payload };

    case "setPlaceDetails/locations":
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

  ///////////////////////////
  // Fetch Locations With Cover Photo
  ///////////////////////////
  const fetchLocationsWithCoverPhoto = async () => {
    dispatch({ type: "startLoading/locations" });
    // check for cached suggestions
    const cachedLocationSuggestions = await getItemIndexedDB(
      "locationsWithPhotos",
      "location"
    );
    if (cachedLocationSuggestions?.length > 0) {
      dispatch({
        type: "setLocations/locations",
        payload: cachedLocationSuggestions,
      });
      dispatch({ type: "stopLoading/locations" });
      return;
    }
    // use backend to fetch info from google places
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
      await setItemIndexedDB(
        "locationsWithPhotos",
        updatedPlacesWithPhoto,
        "location"
      );
      dispatch({
        type: "setLocations/locations",
        payload: updatedPlacesWithPhoto,
      });
      console.log(updatedPlacesWithPhoto, ' <-- updated places with photos')
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
    const cachedDetails = await getItemIndexedDB(locationId, "location");
    if (cachedDetails) {
      return dispatch({
        type: "setLocationDetails/locations",
        payload: cachedDetails,
      });
    }
    try {
      dispatch({ type: "startLoading/locations" });

      const data = await getPlaceDetails(locationId);
      //  asynchronously fetch photos
      const photoReferences = data?.photos.map(
        (photo) => photo.photo_reference
      );
      const photoPromises = photoReferences.map((photo_ref) =>
        fetchLocationPhotos(photo_ref)
      );
      const photoResults = await Promise.all(photoPromises);
      const storageObject = {
        fetchedPhotos: photoResults,
        ...data, // Spread the properties of data into the storageObject
      };
      await setItemIndexedDB(locationId, storageObject, "location");
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

  return (
    <PlacesContext.Provider
      value={{
        locations,
        locationDetails,
        isLoading,deviceWidth,
        fetchPlaceDetails,
        fetchLocationsWithCoverPhoto,
        fetchLocationPhotos,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

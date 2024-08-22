import axios from "axios";
const GOOGLE_PLACES_BASE_URL = import.meta.env.VITE_BASE_URL + "/google";

///////////////////////////
// GET | User Location
///////////////////////////
export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Using an async IIFE to handle the asynchronous nature of getCountryCode
      const countryCode = await (async () => {
        try {
          if (lat && lng) {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const address = response.data.address;
            return address.country_code.toUpperCase();
          }
        } catch (err) {
          console.error("Error getting country code:", err);
          return null;
        }
      })();

      sessionStorage.setItem("countryCode", countryCode);
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lng", lng);
      console.log(
        `Latitude: ${lat}, Longitude: ${lng}, Country Code: ${countryCode}`
      );
      // Use lat and lng to find nearby places
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

///////////////////////////
// GET | Nearby Wine Places
///////////////////////////
export const getNearbyWinePlaces = async () => {
  // first attempt to get from local storage
  let lat = sessionStorage.getItem("lat");
  let lng = sessionStorage.getItem("lng");
  // get user location
  try {
    if (!lat || !lng) {
      console.log(`User has not granted permission to their location yet`);
      getUserLocation();
    }
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to get user's location, cannot recommend dynamic locations`
    );
  }
  try {
    // second attempt attempt to get from local storage
    lat = sessionStorage.getItem("lat");
    lng = sessionStorage.getItem("lng");
    const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/nearbysearch`, {
      params: {
        lat,
        lng,
        radius: 5000,
        type: "restaurant|bar|winery",
        keyword: "wine",
        key: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
      },
    });
    console.log(response.data);
    return response.data.results;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to retrieve nearby wine locations from google places api`
    );
  }
};

///////////////////////////
// GET | Photos of Room Results
// ///////////////////////////
export const getPhotosOfRoom = async (photo_reference, deviceWidth) => {
 
  try {
    const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/room-photos`, {
      params: {
        photo_reference,
        key: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
        deviceWidth
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to retrieve photos for wine locations from google places api`
    );
  }
};

///////////////////////////
// GET | Auto-Populate Wine Establishments
///////////////////////////
export const autoPopulateWineEstablishments = async (inputElement) => {
  const autocomplete = new google.maps.places.Autocomplete(inputElement, {
    types: ["establishment"],
    componentRestrictions: { country: "us" },
  });

  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    console.log(place);
  });
};

///////////////////////////
// GET | Wine Places Autocomplete
///////////////////////////
export const getWinePlacesAutocomplete = async (query, country) => {
  try {
    if (query.length > 3) {
      // params object
      const params = {
        query,
        country,
      };
      // options object
      const options = {
        params,
      };

      const response = await axios.get(
        `${GOOGLE_PLACES_BASE_URL}/autocomplete-search-locations`,
        options
      );
      console.log(response.data);
      return response.data.predictions;
    } else return [];
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to use autocomplete for nearby wine locations with google places api`
    );
  }
};

///////////////////////////
// GET | Place details
///////////////////////////
export const getPlaceDetails = async (placeId) => {
  try {
    const params = {
      placeId,
    };
    const options = {
      params,
    };
    const response = await axios.get(
      `${GOOGLE_PLACES_BASE_URL}/place-details`,
      options
    );
    
    return response.data.result;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to use autocomplete for nearby wine locations with google places api`
    );
  }
};

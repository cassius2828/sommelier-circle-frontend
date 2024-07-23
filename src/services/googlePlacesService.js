import axios from "axios";
const GOOGLE_PLACES_BASE_URL = import.meta.env.VITE_BASE_URL + "/google";

///////////////////////////
// GET | User Location
///////////////////////////
export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      localStorage.setItem("lat", lat);
      localStorage.setItem("lng", lng);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
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
  let lat = localStorage.getItem("lat");
  let lng = localStorage.getItem("lng");
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
    lat = localStorage.getItem("lat");
    lng = localStorage.getItem("lng");
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
export const getPhotosOfRoom = async (photo_reference) => {
  try {
    const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/room-photos`, {
      params: {
        photo_reference,
        key: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
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
export const getWinePlacesAutocomplete = async (query) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=establishment&keyword=wine&key=${
        import.meta.env.VITE_GOOGLE_PLACES_API_KEY
      }`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to use autocomplete for nearby wine locations with google places api`
    );
  }
};

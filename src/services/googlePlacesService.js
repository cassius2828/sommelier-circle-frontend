import axios from "axios";

export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      // Use lat and lng to find nearby places
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

export const getNearbyWinePlaces = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant|bar|winery&keyword=wine&key=${
        import.meta.env.VITE_GOOGLE_PLACES_API_KEY
      }`
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to retrieve nearby wine locations from google places api`
    );
  }
};

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

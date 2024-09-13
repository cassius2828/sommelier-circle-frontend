import LocationsTableList from "./LocationsTableList";

import AutoCompleteInput from "../CommonComponents/AutoCompleteInput";

import { LocationsGrid } from "./LocationGrid";
import { useEffect, useState } from "react";
import { getNearbyWinePlaces } from "../../services/googlePlacesService";
import usePlacesContext from "../../context/places/usePlacesContext";
import { deleteItemIndexedDB } from "../../utils/indexedDB.config";
import Alert from "../CommonComponents/Alert";

const Locations = () => {
  const [display, setDisplay] = useState("full");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { fetchLocationsWithCoverPhoto, rooms } = usePlacesContext();
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  ///////////////////////////
  // Handle Refresh Recommendations
  ///////////////////////////
  const handleRefreshRecommendations = async () => {
    try {
      await deleteItemIndexedDB("locationsWithPhotos", "location");
      setMessage("refreshed recommendations based on your current location");
      fetchLocationsWithCoverPhoto();
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to refresh recommendations based on your current location"
      );
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };
  // loads locations on first attempt
  useEffect(() => {
    fetchLocationsWithCoverPhoto();
  }, []);

  return (
    <div className="flex flex-col w-full  min-h-screen mt-80 items-center relative">
      <AutoCompleteInput />

      <div className="flex items-start gap-12 ">
        <h1 className="text-gray-100 text-5xl mb-12">Recommendations</h1>
        <div className="flex gap-4 items-center">
          <label className="text-gray-100" htmlFor="blog-display">
            Display Locations
          </label>
          <select
            className="text-gray-800 px-4 py-2 rounded-sm"
            name="blog-display"
            id="blog-display"
            value={display}
            onChange={handleDisplayChange}
          >
            <option value="full">Full</option>
            <option value="list">List</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleRefreshRecommendations}
        className="text-xl bg-gray-700 text-gray-100 px-3 py-1 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
      >
        refresh recommendations
      </button>
      {message && <Alert success message={message} />}
      {error && <Alert message={error} />}
      {display === "full" ? (
        <LocationsGrid />
      ) : (
        <LocationsTableList rooms={rooms} />
      )}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </div>
  );
};
export default Locations;

/*
PLACES API OBJECT
Main Img: 
Title: 
Details: 
Address: 
Rating: 
Price: 
Website: 
Hours of Operation: 
Place ID: 

       {
            "business_status": "OPERATIONAL",
            "geometry": {
                "location": {
                    "lat": 38.386936,
                    "lng": -121.933056
                },
                "viewport": {
                    "northeast": {
                        "lat": 38.38841077989272,
                        "lng": -121.9316805701072
                    },
                    "southwest": {
                        "lat": 38.38571112010727,
                        "lng": -121.9343802298927
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
            "icon_background_color": "#FF9E67",
            "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
            "name": "Hide-A-Way Lounge & Grill",
            "opening_hours": {
                "open_now": true
            },
            "photos": [
                {
                    "height": 1536,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/107061166225374119247\">Wez So_N_So</a>"
                    ],
                    "photo_reference": "AUc7tXViEv5OfN09WTJ4yUbwx5h3pikBlEX9ly-cP79zDzL9syRQV0oJEPYUhRG8dF7TZXOaS_myepa7TKcdYV6SfrA6a1e79ye_6MgQlP_Xw1YUQsdKN-MTLDyPrGwZWYSQHIoGPDS8T3ud77u9K2vRCw0A7KqhieSd-E_X5jS7cpvH-cj-",
                    "width": 2048
                }
            ],
            "place_id": "ChIJg9zeYjojhYARcjTx7WobLTQ",
            "plus_code": {
                "compound_code": "93P8+QQ Vacaville, California",
                "global_code": "84CW93P8+QQ"
            },
            "price_level": 2,
            "rating": 4.2,
            "reference": "ChIJg9zeYjojhYARcjTx7WobLTQ",
            "scope": "GOOGLE",
            "types": [
                "bar",
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 427,
            "vicinity": "1080 Orange Dr, Vacaville"
        },

*/

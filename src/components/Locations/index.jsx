import { useEffect, useState } from "react";
// context
import usePlacesContext from "../../context/places/usePlacesContext";
// indexedDB
import { deleteItemIndexedDB } from "../../utils/indexedDB.config";
// components
import AutoCompleteInput from "../CommonComponents/AutoCompleteInput";
import { LocationsGrid } from "./LocationGrid";
import Alert from "../CommonComponents/Alert";

const Locations = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // context
  const { fetchLocationsWithCoverPhoto } = usePlacesContext();

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
    <div className="flex flex-col w-full  min-h-screen pt-12 mt-52 md:mt-80 items-center relative">
      <AutoCompleteInput />

      <div className="flex items-start gap-12 ">
        <h1 className="text-gray-100 text-5xl mb-12">Recommendations</h1>
      </div>
      <button
        onClick={handleRefreshRecommendations}
        className="text-xl bg-gray-700 text-gray-100 px-3 py-1 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
      >
        refresh recommendations
      </button>
      {message && <Alert success message={message} />}
      {error && <Alert message={error} />}

      <LocationsGrid />

      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </div>
  );
};
export default Locations;

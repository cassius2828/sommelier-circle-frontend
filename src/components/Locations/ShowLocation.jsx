/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import StarList, { Star } from "../CommonComponents/StarList";
import { useEffect, useState } from "react";
import {
  getPhotosOfLocation,
  getPlaceDetails,
} from "../../services/googlePlacesService";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import ShowLocationImageCarousel from "./ShowLocationImgCarousel";
import useAuthContext from "../../context/auth/useAuthContext";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";
import LoaderSpin from "../CommonComponents/LoaderSpin";
import usePlacesContext from "../../context/places/usePlacesContext";

///////////////////////////
// * Show Location | Main Component
///////////////////////////
const ShowLocation = () => {
  return (
    <div className="w-full mt-80">
      <ShowLocationCard />
    </div>
  );
};
export default ShowLocation;

///////////////////////////
// * Show Location Card
///////////////////////////
export const ShowLocationCard = () => {
  // local state
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  // hooks
  const { locationId } = useParams();
  // context
  const { fetchPlaceDetails, isLoading, locationDetails } = usePlacesContext();
  const { fetchedPhotos } = locationDetails;
  const { favoritesMessage, setFavoritesMessage, handleAddToFavorites } =
    useGlobalContext();
  const { user } = useAuthContext();
  // regex for phone number tel:5555555555
  const regex = /\d+/g;
  const nonformattedTelNumber = locationDetails.formatted_phone_number
    ?.match(regex)
    .join("");
  // converts rating to scale of 100
  const rating = locationDetails?.rating * 20;
  
  // Call this function every time a new place_id is in the params
  useEffect(() => {
    fetchPlaceDetails(locationId);
    console.log(fetchedPhotos, " <-- fetched photos");
  }, []);

  // run this function again if part of the location details are loaded the but photo is not, this is
  // to prevent when the photo never arrives and a constant loading state remains

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-3 grid-rows-3 bg-[#111213] shadow-lg w-full lg:w-1/2 mx-auto max-h-[60rem] text-gray-100 rounded-md p-4 relative">
      {showCarousel ? (
        <ShowLocationImageCarousel
          setShowCarousel={setShowCarousel}
          setIsImgHovered={setIsImgHovered}
          photos={fetchedPhotos}
        />
      ) : (
        <>
          {" "}
          <Link className="absolute top-0 right-4 " to={`/locations/explore`}>
            <span className="text-5xl cursor-pointer">
              x
            </span>
          </Link>
          {/* img, title, address, rating */}
          <div className="col-start-1 row-span-3 p-4 flex flex-col justify-between">
            <div
              onMouseEnter={() => setIsImgHovered(true)}
              onMouseLeave={() => setIsImgHovered(false)}
              className="h-1/2 relative"
            >
              {fetchedPhotos[0] ? (
                <img
                  className="h-full object-cover"
                  src={
                    fetchedPhotos[0]
                      ? fetchedPhotos[0]
                      : "https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  }
                  alt={
                    locationDetails
                      ? locationDetails?.editorial_summary?.overview
                      : "place details has not loaded properly"
                  }
                />
              ) : (
                <LoaderSpin />
              )}

              <div
                className={`bg-[#000000CC] ${
                  isImgHovered ? "" : "opacity-0"
                } absolute w-full h-full top-0 left-0 transition-all duration-200 ease-out`}
              ></div>
              {isImgHovered && (
                <button
                  onClick={() => setShowCarousel(true)}
                  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
                >
                  view all photos
                </button>
              )}
            </div>

            <div className="flex-col flex gap-8">
              <h1 className=" text-6xl mt-4">{locationDetails.name}</h1>
              <h2 className=" text-4xl">{locationDetails.formatted_address}</h2>
              <StarList bgColor="[#]" criticScore={rating} />
              {/* buttons | fav, directions, website */}
              <div className="flex items-center  justify-center gap-4 mr-auto mt-12 ">
                <button
                  onClick={() =>
                    handleAddToFavorites(
                      user._id,
                      locationDetails.place_id,
                      "locations"
                    )
                  }
                  className="p-2 h-16 border-2 border-[#FFD700] rounded-lg"
                >
                  <Star />
                </button>

                {favoritesMessage && (
                  <AddedToFavoritesModal
                    message={favoritesMessage}
                    setMessage={setFavoritesMessage}
                  />
                )}
                <Link to={locationDetails.website}>
                  <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                    website
                  </button>
                </Link>
                <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-default">
                  {locationDetails.reservable
                    ? "reserveable"
                    : "non-reservable"}
                </button>
              </div>
            </div>
          </div>
          {/* details */}
          <p className="col-span-2 col-start-2 row-start-1 text-2xl mt-12 p-4">
            {locationDetails?.editorial_summary?.overview}
          </p>
          {/* hours of operation */}
          <div className="flex items-start justify-end gap-6 mt-12 col-span-2 col-start-2 row-start-2 ">
            <div className="flex flex-col">
              <h3 className=" text-3xl p-3">Hours</h3>
              <ul className="flex flex-col items-start justify-start">
                {locationDetails.opening_hours?.weekday_text.map((day) => (
                  <li
                    key={day}
                    className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out"
                  >
                    {day}
                  </li>
                ))}
              </ul>
            </div>
            {/* contact info */}
            <div className="flex flex-col items-start justify-start gap-3">
              <h4 className=" text-3xl p-3">Contact</h4>
              <ul className="flex flex-col items-start justify-start gap-4">
                <a href={`tel:${nonformattedTelNumber}`}>
                  <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                    Phone: {locationDetails.formatted_phone_number}
                  </li>
                </a>
                {/* open google maps */}
                <Link to={locationDetails.url}>
                  <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                    Open Google Maps
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
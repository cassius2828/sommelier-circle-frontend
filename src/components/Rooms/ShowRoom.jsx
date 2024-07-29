/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import StarList, { Star } from "../CommonComponents/StarList";
import { useEffect, useState } from "react";
import {
  getPhotosOfRoom,
  getPlaceDetails,
} from "../../services/googlePlacesService";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import ShowRoomImageCarousel from "./ShowRoomImgCarousel";


///////////////////////////
// * Show Room | Main Component
///////////////////////////
const ShowRoom = () => {
  return (
    <div className="w-full mt-80">
      <ShowRoomCard />
     
    </div>
  );
};
export default ShowRoom;

///////////////////////////
// * Show Room Card
///////////////////////////
export const ShowRoomCard = () => {
  // local state
  const [placeDetails, setPlaceDetails] = useState({});
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [photos, setPhotos] = useState([]);
// hooks
  const navigate = useNavigate();
  const { roomId } = useParams();
  // context
  const { isLoading, setIsLoading, deviceWidth } = useGlobalContext();
  // regex for phone number tel:5555555555
  const regex = /\d+/g;
  const nonformattedTelNumber = placeDetails.formatted_phone_number
    ?.match(regex)
    .join("");
    // converts rating to scale of 100
  const rating = placeDetails?.rating * 20;

  ///////////////////////////
  // Fetch Place Details and Photos
  ///////////////////////////
  const fetchPlaceDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getPlaceDetails(roomId);

//  asynchronously fetch photos
      const photoReferences = data.photos.map((photo) => photo.photo_reference);
      const photoPromises = photoReferences.map((photo_ref) =>
        fetchRoomPhotos(photo_ref)
      );
      const photoResults = await Promise.all(photoPromises);
      // set state data
      setPhotos(photoResults);
      setPlaceDetails(data);
    } catch (err) {
      console.error(err);
      console.log(
        `Error communicating with backend to retrieve place details from google place api`
      );
    } finally {
      setIsLoading(false);
    }
  };
///////////////////////////
// Fetch Room Photos function
///////////////////////////
  const fetchRoomPhotos = async (photo_reference) => {
    try {
      const data = await getPhotosOfRoom(photo_reference, deviceWidth);
      if (!photos.includes(data)) {
        return data;
      }
    } catch (err) {
      console.error(err);
      console.log(
        `Error communicating with backend to retrieve place photos from google place api`
      );
    }
  };

  // Call this function every time a new place_id is in the params
  useEffect(() => {

    fetchPlaceDetails();
  }, [roomId]);

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-3 grid-rows-3 bg-[#111213] shadow-lg w-full lg:w-1/2 mx-auto max-h-[60rem] text-gray-100 rounded-md p-4 relative">
      {showCarousel ? (
        <ShowRoomImageCarousel
          setShowCarousel={setShowCarousel}
          setIsImgHovered={setIsImgHovered}
          photos={photos}
        />
      ) : (
        <>
          {" "}
          <span
            onClick={() => navigate(-1)}
            className="absolute top-0 right-4 text-5xl cursor-pointer"
          >
            x
          </span>
          {/* img, title, address, rating */}
          <div className="col-start-1 row-span-3 p-4 flex flex-col justify-between">
            <div
              onMouseEnter={() => setIsImgHovered(true)}
              onMouseLeave={() => setIsImgHovered(false)}
              className="h-1/2 relative"
            >
              <img
                className="h-full object-cover"
                src={photos[0] ? photos[0] : ""}
                alt={
                  placeDetails
                    ? placeDetails?.editorial_summary?.overview
                    : "place details has not loaded properly"
                }
              />

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
              <h1 className=" text-6xl mt-4">{placeDetails.name}</h1>
              <h2 className=" text-4xl">{placeDetails.formatted_address}</h2>
              <StarList bgColor="[#]" criticScore={rating} />
              {/* buttons | fav, directions, website */}
              <div className="flex items-center  justify-center gap-4 mr-auto mt-12 ">
                <button className="p-2 h-16 border-2 border-[#FFD700] rounded-lg">
                  <Star />
                </button>
                <Link to={placeDetails.website}>
                  <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                    website
                  </button>
                </Link>
                <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-default">
                  {placeDetails.reservable ? "reserveable" : "non-reservable"}
                </button>
              </div>
            </div>
          </div>
          {/* details */}
          <p className="col-span-2 col-start-2 row-start-1 text-2xl mt-12 p-4">
            {placeDetails?.editorial_summary?.overview}
          </p>
          {/* hours of operation */}
          <div className="flex items-start justify-end gap-6 mt-12 col-span-2 col-start-2 row-start-2 ">
            <div className="flex flex-col">
              <h3 className=" text-3xl p-3">Hours</h3>
              <ul className="flex flex-col items-start justify-start">
                {placeDetails.opening_hours?.weekday_text.map((day) => (
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
                    Phone: {placeDetails.formatted_phone_number}
                  </li>
                </a>
                {/* open google maps */}
                <Link to={placeDetails.url}>
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


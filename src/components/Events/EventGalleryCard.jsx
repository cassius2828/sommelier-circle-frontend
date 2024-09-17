/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
import useAuthContext from "../../context/auth/useAuthContext";
// components
import Loader from "../CommonComponents/Loader";
import { Star } from "../CommonComponents/StarList";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";

const EventGalleryCard = ({
  eventId,
  photo,
  eventName,
  streetAddress,
  city,
  state,
  date,
  startTimeHour,
  startTimeMinute,
  startTimeTod,
  endTimeHour,
  endTimeMinute,
  endTimeTod,
  ticketedEvent,
  ticketPrice,
  ticketsAvailable,
}) => {
  const {
    isLoading,
    favoritesMessage,
    setFavoritesMessage,
    handleAddToFavorites,
  } = useGlobalContext();
  const { user } = useAuthContext();
  if (isLoading) return <Loader />;

  const address = `${streetAddress}, ${city}, ${state}`;
  const eventTime = `${startTimeHour}:${startTimeMinute}${startTimeTod} to ${endTimeHour}:${endTimeMinute}${endTimeTod}`;

  return (
    <div className="grid grid-cols-2 p-4  ">
      {/* Row 1: Image */}
      <img
        className="col-span-2 row-start-1 rounded-lg mb-5 h-96 w-full object-cover"
        src={
          photo
            ? photo
            : "https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt={eventName}
      />
      {/* Row 2: Event Info */}
      <div className="flex flex-col items-center justify-between p-4">
        <span className="text-3xl text-gray-100">{address}</span>
        <span className="text-3xl text-gray-100">{eventTime}</span>
      </div>
      <div className="flex flex-col items-center justify-between text-gray-100">
        <div className="text-center">
          <h2 className="text-4xl mb-3">{eventName}</h2>
          <h3 className="text-2xl">
            {" "}
            {new Date(date).toDateString() || "Aug 8th, 2024"}
          </h3>
        </div>
        <div className="mt-6 gap-4 md:gap-12 flex justify-center ">
          <button
            onClick={() => handleAddToFavorites(user._id, eventId, "events")}
            className="p-2 border-2 border-[#FFD700] rounded-lg"
          >
            <Star /> {/* Assuming this is an icon component */}
          </button>

          {/* favorite */}

          {favoritesMessage && (
            <AddedToFavoritesModal
              message={favoritesMessage}
              setMessage={setFavoritesMessage}
            />
          )}
          <button
            className={`border h-16 px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white ${
              ticketedEvent ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {ticketedEvent ? "Tickets" : "Free"}
          </button>
          <Link to={`/events/${eventId}`}>
            <button className="border h-full px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EventGalleryCard;

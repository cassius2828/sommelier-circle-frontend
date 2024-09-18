import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
import useAuthContext from "../../context/auth/useAuthContext";
// service
import { getEventDetails } from "../../services/eventService";
// components
import TicketModal from "./Tickets/TicketModal";
import ShowRoomImageCarousel from "../Locations/ShowLocationImgCarousel";
import Loader from "../CommonComponents/Loader";
import { Star } from "../CommonComponents/StarList";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";

const EventDetailContainer = () => {
  return (
    <div className="w-full mt-40 md:mt-80">
      <EventDetail />
    </div>
  );
};
export default EventDetailContainer;

export const EventDetail = () => {
  // Local state
  const [eventDetails, setEventDetails] = useState({});
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const { user } = useAuthContext();
  const { setFavoritesMessage, favoritesMessage, handleAddToFavorites } =
    useGlobalContext();
  // Destructure event details
  const {
    photo,
    eventName,
    streetAddress,
    city,
    state,
    phone,
    email,
    ticketedEvent,
    ticketPrice,
    ticketsAvailable,
    eventDescription,
    date,
    startTimeHour,
    startTimeMinute,
    startTimeTod,
    endTimeHour,
    endTimeMinute,
    endTimeTod,
    owner,
  } = eventDetails;

  // Hooks
  const navigate = useNavigate();
  const { eventId } = useParams();

  // Context
  const { isLoading } = useGlobalContext();

  // Regex for phone number tel:5555555555
  const regex = /\d+/g;
  const nonformattedTelNumber = phone?.match(regex)?.join("");

  // Fetch Event Details
  const fetchEventDetails = async () => {
    try {
      const data = await getEventDetails(eventId);
      setEventDetails(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch event details from service function`);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* <div className="absolute z-10 w-screen h-screen bg-black opacity-50 top-0 left-0"></div> */}

      <div className=" bg-[#111213] shadow-lg w-full lg:w-1/2 mx-auto  text-gray-100 rounded-md p-4 relative pt-12 mt-52 md:mt-80 mb-24">
        {showCarousel ? (
          <ShowRoomImageCarousel
            setShowCarousel={setShowCarousel}
            setIsImgHovered={setIsImgHovered}
            photos={photos}
          />
        ) : (
          <>
            <span
              onClick={() => navigate(-1)}
              className="absolute top-0 right-4 text-5xl cursor-pointer"
            >
              x
            </span>

            {/* Image, Title, Address */}
            <div className=" p-4 flex flex-col md:flex-row justify-between gap-12">
              <div
                onMouseEnter={() => setIsImgHovered(true)}
                onMouseLeave={() => setIsImgHovered(false)}
                className="h-1/2 w-full md:w-3/4 relative"
              >
                <img
                  className="h-full w-full object-cover"
                  src={photo || "https://via.placeholder.com/150"}
                  alt={eventName || "Event image"}
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
                    View All Photos
                  </button>
                )}
              </div>

              <div className="flex-col flex gap-8">
                <h1 className="text-6xl mt-4">
                  {eventName || "Placeholder Name"}
                </h1>
                <h2 className="text-4xl">
                  {`${streetAddress}, ${city}, ${state}` ||
                    "123 Main St, Vacaville CA, 95687"}
                </h2>
                {/* action btns */}
                <div className="flex items-center justify-center gap-4 mr-auto mt-12">
                  <button
                    onClick={() =>
                      handleAddToFavorites(user?._id, eventId, "events")
                    }
                    className="p-2 h-20 w-20 border-2 border-[#FFD700] rounded-lg flex items-center justify-center"
                  >
                    <Star />
                  </button>
                  {/* favorite */}

                  {favoritesMessage && (
                    <AddedToFavoritesModal
                      message={favoritesMessage}
                      setMessage={setFavoritesMessage}
                    />
                  )}
                  <button
                    onClick={() => {
                      if (ticketedEvent) {
                        setShowTicketModal(true);
                      }
                    }}
                    className={`border h-20 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white ${
                      ticketedEvent ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {ticketedEvent ? `Tickets: $${ticketPrice}` : "Free Event"}
                  </button>
                  {owner?.toString() === user?._id.toString() && (
                    <Link to={`/events/${eventId}/edit`}>
                      <button
                        className={`border h-20 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-pointer`}
                      >
                        Edit Event
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Event Description */}
            <p className=" text-2xl mt-12 p-4">
              {eventDescription ||
                "Brief overview of the event and what it entails"}
            </p>

            {/* Event Time and Contact */}
            <div className="flex items-start  justify-start gap-6 mt-12 col-span-2 col-start-2 row-start-2">
              <div className="flex flex-col mx-20">
                <div>
                  <h3 className="text-3xl p-3">Date</h3>
                  <span className="flex flex-col items-start justify-start">
                    {new Date(date).toDateString() || "Aug 8th, 2024"}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl p-3">Hours</h3>
                  <span className="flex flex-col items-start justify-start">
                    {`${startTimeHour}:${startTimeMinute} ${startTimeTod} - ${endTimeHour}:${endTimeMinute} ${endTimeTod}`}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-start justify-start gap-3">
                <h4 className="text-3xl p-3">Contact</h4>
                <ul className="flex flex-col items-start justify-start gap-8">
                  <a href={`tel:${nonformattedTelNumber}`}>
                    <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                      Phone: {phone || "(555) 555-5555"}
                    </li>
                  </a>
                  <a href={`mailto:${email}`}>
                    <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                      Email: {email || "johndoe@gmail.com"}
                    </li>
                  </a>
                  <Link
                    to={`https://maps.google.com/?q=${streetAddress}, ${city}, ${state}`}
                  >
                    <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                      Open Google Maps
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </>
        )}
        {showTicketModal && (
          <>
            <TicketModal
              setShowTicketModal={setShowTicketModal}
              ticketPrice={ticketPrice}
              ticketsAvailable={ticketsAvailable}
              eventName={eventName}
            />
          </>
        )}
      </div>
    </>
  );
};

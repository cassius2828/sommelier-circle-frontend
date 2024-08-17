import { useEffect, useState } from "react";
import { EventGrid } from "./EventGrid";
import SearchBar from "../CommonComponents/SearchBar";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useLocation } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";
import { getExploreEvents } from "../../services/eventService";

const initialFormData = {
  query: "",
  category: "",
};
const Events = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState(events);

  const { user } = useAuthContext();
  const handleSearchEventsByTitle = (e) => {
    const { name, value } = e.target;
    // allows us to type "and" instead of & for our searches
    const normalizedValue = value.toLowerCase().replace(/&/g, "and");

    // keeps state fresh by using callback to handle the filtering
    setFormData((prevState) => {
      const newFormData = { ...prevState, [name]: value };

      if (normalizedValue.length > 2) {
        const updatedEvents = displayEvents.filter((event) => {
          const normalizedEventName = event.eventName
            .toLowerCase()
            .replace(/&/g, "and");
          return normalizedEventName.includes(normalizedValue);
        });
        setDisplayEvents(updatedEvents);
      } else if (normalizedValue.length < 1) {
        setDisplayEvents(events);
      }
      // sets our formdata state to most recent version
      return newFormData;
    });
  };

  useEffect(() => {
    const fetchExploreEvents = async () => {
      try {
        const data = await getExploreEvents(user._id);
        setEvents(data);
        setDisplayEvents(data)
      } catch (err) {
        console.error(err);
        console.log(`Unable to get user events from service function`);
      }
    };
    fetchExploreEvents();
  }, []);

  return (
    <div className="flex flex-col w-full  min-h-screen mt-80 items-center">
      <h1 className="text-8xl text-gray-100 mb-12">Events</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-center items-center">
          <div className="relative mb-8 w-1/2  items-center">
            {/* search bar */}
            <input
              name="query"
              value={formData.query}
              onChange={(e) => {
                handleSearchEventsByTitle(e);
              }}
              type="text"
              placeholder="Search"
              className="w-full p-4 text-gray-800 rounded-md"
            />
            {/* search icon */}
            <button className="absolute right-0 top-0 mt-4 mr-4">
              <svg
                className="h-6 w-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.707 22.293l-6.387-6.386C18.177 14.187 19 12.176 19 10 19 4.486 14.514 0 9 0S-1 4.486-1 10s4.486 10 10 10c2.176 0 4.187-.823 5.907-2.321l6.386 6.387c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414zM2 10c0-3.859 3.141-7 7-7s7 3.141 7 7-3.141 7-7 7-7-3.141-7-7z" />
              </svg>
            </button>
          </div>

          {/* clear search btn */}
          <button
            onClick={() => setFormData({ ...formData, query: "" })}
            className=" border-neutral-200 border text-2xl ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
          >
            clear search
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className=" border-neutral-200 border text-2xl ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
            >
              filter by
            </button>
            {showFilters && (
              <ul className="w-full absolute top-full bg-blue-500 flex flex-col items-center justify-start rounded-md">
                <li
                  onClick={() => setShowFilters(false)}
                  className="bg-red-400 p-3 text-xl w-full cursor-pointer hover:bg-red-600"
                >
                  city
                </li>{" "}
                <li
                  onClick={() => setShowFilters(false)}
                  className="bg-red-400 p-3 text-xl w-full cursor-pointer hover:bg-red-600"
                >
                  date
                </li>{" "}
                <li
                  onClick={() => setShowFilters(false)}
                  className="bg-red-400 p-3 text-xl w-full cursor-pointer hover:bg-red-600"
                >
                  time of day
                </li>
              </ul>
            )}
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-100">
          {displayEvents.length} events found
        </h1>
      </div>
      <EventGrid events={displayEvents} />
    </div>
  );
};
export default Events;

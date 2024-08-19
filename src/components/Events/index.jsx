import { useEffect, useState } from "react";
import { EventGrid } from "./EventGrid";
import SearchBar from "../CommonComponents/SearchBar";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useLocation } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";
import { getExploreEvents } from "../../services/eventService";
import ExploreFilter from "./ExploreFilter";
import useEventsContext from "../../context/events/useEventsContext";

const initialFormData = {
  query: "",
  category: "",
};

const Events = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showFilters, setShowFilters] = useState(false);

  const { fetchExploreEvents, exploreEvents, setDisplayEvents, dispatch } =
    useEventsContext();
  const { user } = useAuthContext();
  const { debounce } = useGlobalContext();
  // Separate handler for the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 // Debounced function to fetch events
 const handleSearchEventsByTitle = debounce(async () => {
  const normalizedValue = formData.query.toLowerCase().replace(/&/g, "and");
  if (formData.query.length > 2) {
    await fetchExploreEvents(user._id, normalizedValue);
  } else if (formData.query.length === 0) {
    await fetchExploreEvents(user._id);
  }
}, 300);

  // Effect to call the debounced search when the query changes
  useEffect(() => {
    handleSearchEventsByTitle();
  }, [formData.query]);

  useEffect(() => {
    fetchExploreEvents(user._id);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen mt-80 items-center">
      <h1 className="text-8xl text-gray-100 mb-12">Events</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-center items-center">
          <div className="relative mb-8 w-1/2 items-center">
            {/* search bar */}
            <input
              name="query"
              value={formData.query}
           onChange={handleInputChange}
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
            className="border-neutral-200 border text-2xl ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
          >
            clear search
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="border-neutral-200 border text-2xl ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
            >
              filter by
            </button>
            {showFilters && (
              <ExploreFilter
                events={exploreEvents}
                setShowFilters={setShowFilters}
              />
            )}
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-100">
          {exploreEvents?.length} events found
        </h1>
      </div>
      <EventGrid events={exploreEvents} />
    </div>
  );
};

export default Events;

// keeps state fresh by using callback to handle the filtering
// setFormData((prevState) => {
//   const newFormData = { ...prevState, [name]: value };

//   if (normalizedValue.length > 2) {
//     const updatedEvents = displayEvents.filter((event) => {
//       const normalizedEventName = event.eventName
//         .toLowerCase()
//         .replace(/&/g, "and");
//       return normalizedEventName.includes(normalizedValue);
//     });
//     console.log(updatedEvents, ' <-- updated Events')
//     setDisplayEvents(updatedEvents);
//     console.log(displayEvents, ' <- display events')
//   } else if (normalizedValue.length < 1) {
//     setDisplayEvents(exploreEvents);
//   }
//   // sets our formdata state to most recent version
//   return newFormData;
// });

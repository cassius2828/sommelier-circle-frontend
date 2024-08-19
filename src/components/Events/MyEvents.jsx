import { useEffect, useState } from "react";
import { EventGrid } from "./EventGrid";
import SearchBar from "../CommonComponents/SearchBar";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useLocation } from "react-router-dom";
import { getUserEvents } from "../../services/eventService";
import useAuthContext from "../../context/auth/useAuthContext";
import useEventsContext from "../../context/events/useEventsContext";

const initialFormData = {
  query: "",
  category: "",
};
const MyEvents = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showFilters, setShowFilters] = useState(false);
  const { fetchUserEvents, userEvents, eventsMessage } = useEventsContext();
  const { debounce } = useGlobalContext();
  const { user } = useAuthContext();

  // const handleSearchEventsByTitle = (e) => {
  //   const { name, value } = e.target;
  //   // allows us to type "and" instead of & for our searches
  //   const normalizedValue = value.toLowerCase().replace(/&/g, "and");

  //   // keeps state fresh by using callback to handle the filtering
  //   setFormData((prevState) => {
  //     const newFormData = { ...prevState, [name]: value };

  //     if (normalizedValue.length > 2) {
  //       const updatedEvents = events.filter((event) => {
  //         const normalizedEventName = event.name
  //           .toLowerCase()
  //           .replace(/&/g, "and");
  //         return normalizedEventName.includes(normalizedValue);
  //       });
  //       setDisplayEvents(updatedEvents);
  //     } else if (normalizedValue.length < 1) {
  //       setDisplayEvents(events);
  //     }
  //     // sets our formdata state to most recent version
  //     return newFormData;
  //   });
  // };

  // Separate handler for the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    })
 
  ); console.log(value)
  };
  // Debounced function to fetch events
  const handleSearchEventsByTitle = debounce(async () => {
    const normalizedValue = formData.query.toLowerCase().replace(/&/g, "and");
    if (formData.query.length > 2) {
      await fetchUserEvents(user._id, normalizedValue);
    } else if (formData.query.length === 0) {
      await fetchUserEvents(user._id);
    }
  }, 300);
  useEffect(() => {
    fetchUserEvents(user._id);
  }, []);

  useEffect(() => {
    console.log(eventsMessage, " <-- events message");
  }, [eventsMessage]);

  useEffect(() => {
    handleSearchEventsByTitle();
    console.log(formData.query)
  }, [formData.query]);

  return (
    <div className="flex flex-col w-full  min-h-screen mt-80 items-center">
      <h1 className="text-8xl text-gray-100 mb-12">My Events</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-center items-center">
          <div className="relative mb-8 w-1/2  items-center">
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
          {userEvents.length} events found
        </h1>
      </div>
      <EventGrid events={userEvents} />
    </div>
  );
};
export default MyEvents;

const events = [
  {
    photos: [{ photo_reference: "photo_1_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.7,
    name: "Sunset Wine Tasting",
    vicinity: "Napa Valley Vineyards, CA",
    opening_hours: { open_now: true },
  },
  {
    photos: [{ photo_reference: "photo_2_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.5,
    name: "Wine & Cheese Soirée",
    vicinity: "Downtown Loft, San Francisco, CA",
    opening_hours: { open_now: false },
  },
  {
    photos: [{ photo_reference: "photo_3_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.9,
    name: "Red Wine Lovers Meetup",
    vicinity: "Brooklyn Winery, New York, NY",
    opening_hours: { open_now: true },
  },
  {
    photos: [{ photo_reference: "photo_4_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.6,
    name: "Chardonnay & Chat",
    vicinity: "Wine Bar, Chicago, IL",
    opening_hours: { open_now: true },
  },
  {
    photos: [{ photo_reference: "photo_5_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.8,
    name: "Summer Vineyard Picnic",
    vicinity: "Sonoma County, CA",
    opening_hours: { open_now: false },
  },
  {
    photos: [{ photo_reference: "photo_6_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.3,
    name: "Rooftop Wine & Dine",
    vicinity: "Skyline Terrace, Los Angeles, CA",
    opening_hours: { open_now: true },
  },
  {
    photos: [{ photo_reference: "photo_7_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.7,
    name: "Wine & Jazz Night",
    vicinity: "The Jazz Lounge, New Orleans, LA",
    opening_hours: { open_now: true },
  },
  {
    photos: [{ photo_reference: "photo_8_reference" }],
    photo: "https://via.placeholder.com/150",
    rating: 4.4,
    name: "Vintage Wine Tasting",
    vicinity: "Old Town, Alexandria, VA",
    opening_hours: { open_now: false },
  },
];

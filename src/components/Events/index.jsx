import { useEffect, useState } from "react";
import { EventGrid } from "./EventGrid";
import SearchBar from "../CommonComponents/SearchBar";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useLocation } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";
import { getExploreEvents } from "../../services/eventService";
import ExploreFilter from "./ExploreFilter";
import useEventsContext from "../../context/events/useEventsContext";
import DisplayEvents from "./DisplayEvents";

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
    <DisplayEvents
      formData={formData}
      handleInputChange={handleInputChange}
      setFormData={setFormData}
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      events={exploreEvents}
    />
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

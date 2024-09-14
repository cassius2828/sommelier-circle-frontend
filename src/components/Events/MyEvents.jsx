import { useEffect, useState } from "react";
import { EventGrid } from "./EventGrid";
import SearchBar from "../CommonComponents/SearchBar";
import useGlobalContext from "../../context/global/useGlobalContext";
import { useLocation } from "react-router-dom";
import { getUserEvents } from "../../services/eventService";
import useAuthContext from "../../context/auth/useAuthContext";
import useEventsContext from "../../context/events/useEventsContext";
import DisplayEvents from "./DisplayEvents";

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
    <DisplayEvents formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} showFilters={showFilters} setShowFilters={setShowFilters} events={userEvents}/>

  );
};
export default MyEvents;



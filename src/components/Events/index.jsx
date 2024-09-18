import { useEffect, useState } from "react";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
import useAuthContext from "../../context/auth/useAuthContext";
import useEventsContext from "../../context/events/useEventsContext";
// components
import DisplayEvents from "./DisplayEvents";

const initialFormData = {
  query: "",
  category: "",
};

const Events = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showFilters, setShowFilters] = useState(false);

  const { fetchExploreEvents, exploreEvents } = useEventsContext();
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
      await fetchExploreEvents(user?._id, normalizedValue);
    } else if (formData.query.length === 0) {
      await fetchExploreEvents(user?._id);
    }
  }, 300);

  // Effect to call the debounced search when the query changes
  useEffect(() => {
    handleSearchEventsByTitle();
  }, [formData.query]);

  useEffect(() => {
    fetchExploreEvents(user?._id);
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

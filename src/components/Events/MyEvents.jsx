import { useEffect, useState } from "react";
// context
import useGlobalContext from "../../context/global/useGlobalContext";
import useAuthContext from "../../context/auth/useAuthContext";
import useEventsContext from "../../context/events/useEventsContext";
// components
import DisplayEvents from "./DisplayEvents";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import NoContentFound from "../CommonComponents/NoContentFound";

const initialFormData = {
  query: "",
  category: "",
};
const MyEvents = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showFilters, setShowFilters] = useState(false);
  // context
  const { fetchUserEvents, userEvents, eventsMessage } = useEventsContext();
  const { debounce } = useGlobalContext();
  const { user } = useAuthContext();

  ///////////////////////////
  // Handle Input Chnage
  ///////////////////////////
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(value);
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
    if (!user) return;
    fetchUserEvents(user._id);
  }, []);

  ///////////////////////////
  // Handle Seach Events By Title
  ///////////////////////////
  useEffect(() => {
    handleSearchEventsByTitle();
  }, [formData.query]);

  if (!user)
    return (
      <>
        <PromptSignIn subject={"Your Events"} />
      </>
    );

  if (userEvents.length < 1)
    return (
      <NoContentFound
        subject={"events"}
        message='Add to your favorite events by clicking the star on any event card. Visit "explore events" to find event cards.'
      />
    );

  return (
    <DisplayEvents
      formData={formData}
      handleInputChange={handleInputChange}
      setFormData={setFormData}
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      events={userEvents}
    />
  );
};
export default MyEvents;

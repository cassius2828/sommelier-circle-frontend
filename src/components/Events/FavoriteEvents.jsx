import { useEffect, useState } from "react";
import { EventGrid } from "./EventGrid";

import { useParams } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";

import { getFavoriteItems } from "../../services/favoritesService";
import Loader from "../CommonComponents/Loader";

const FavoriteEvents = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavoriteEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getFavoriteItems(userId, "events");
      console.log(data, " favorite events");
      setEvents(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to get user events from service function`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteEvents();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col w-full min-h-screen mt-80 items-center">
      <h1 className="text-8xl text-gray-100 mb-12">Events</h1>
      <div className="w-1/2 mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-100">
          {events?.length} events found
        </h1>
      </div>
      <EventGrid events={events} />
    </div>
  );
};

export default FavoriteEvents;

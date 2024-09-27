import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// context
import useAuthContext from "../../context/auth/useAuthContext";
// services
import { getFavoriteItems } from "../../services/favoritesService";
// components
import { EventGrid } from "./EventGrid";
import Loader from "../CommonComponents/Loader";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import useGlobalContext from "../../context/global/useGlobalContext";
import NoContentFound from "../CommonComponents/NoContentFound";

const FavoriteEvents = () => {
  const [events, setEvents] = useState(null);
  // context
  const { user, displayTargetedUsername } = useAuthContext();
  const { isLoading, setIsLoading } = useGlobalContext();
  // hooks
  const { userId } = useParams();

  const fetchFavoriteEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getFavoriteItems(userId, "events");
      setEvents(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to get user events from service function`);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteEvents();
  }, []);

  if (isLoading || events === null) return <Loader />;
  if (!user)
    return (
      <>
        <PromptSignIn subject={"Favorite Events"} />
      </>
    );
  if (events.length < 1)
    return (
      <NoContentFound
        subject={"events"}
        message='Add to your favorite events by clicking the star on any event card. See "explore events" to find events to add.'
      />
    );
  return (
    <div className="flex flex-col w-full min-h-screen pt-12 mt-52 md:mt-80 items-center">
      <h1 className="text-8xl text-gray-100 mb-12">{`${
        displayTargetedUsername || ""
      } Favorite Events`}</h1>
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

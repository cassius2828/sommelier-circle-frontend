import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import EventGalleryCard from "./EventGalleryCard";

  
export const EventGrid = ({events}) => {
 
    const { isLoading } = useGlobalContext();
    if (isLoading) return <Loader />;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-y-8 gap-x-4">
        {events.map((room, idx) => (
          <EventGalleryCard
            img={room.photos[0].photo_reference}
            photo={room.photo}
            rating={room.rating}
            name={room.name}
            address={room.vicinity}
            key={idx}
            isOpen={room.opening_hours.open_now}
          />
        ))}
      </div>
    );
  };
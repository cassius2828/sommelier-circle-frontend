import { useEffect, useState } from "react";
import useEventsContext from "../../context/events/useEventsContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import EventGalleryCard from "./EventGalleryCard";

export const EventGrid = ({ events }) => {
  const { isLoading } = useGlobalContext();

  if (isLoading) return <Loader />;
  if (events.length === 0)
    return (
      <h1 className="text-gray-100 font-mono text-4xl">
        No events were found. Encourage your peers to create an event for the
        community!
      </h1>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-y-8 gap-x-4">
      {events.map((room, idx) => (
        <EventGalleryCard
          key={room.eventName + idx}
          photo={room.photo}
          eventName={room.eventName}
          streetAddress={room.streetAddress}
          city={room.city}
          state={room.state}
          startTimeHour={room.startTimeHour}
          startTimeMinute={room.startTimeMinute}
          startTimeTod={room.startTimeTod}
          endTimeHour={room.endTimeHour}
          endTimeMinute={room.endTimeMinute}
          endTimeTod={room.endTimeTod}
          ticketedEvent={room.ticketedEvent}
          ticketPrice={room.ticketPrice}
          ticketsAvailable={room.ticketsAvailable}
          id={room._id}
        />
      ))}
    </div>
  );
};

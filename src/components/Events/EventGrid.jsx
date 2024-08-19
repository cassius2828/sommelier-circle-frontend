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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-y-8 gap-x-4">
      {events.map((event, idx) => (
        <EventGalleryCard
          key={event.eventName + idx}
          photo={event.photo}
          eventName={event.eventName}
          streetAddress={event.streetAddress}
          city={event.city}
          state={event.state}
          date={event.date}
          startTimeHour={event.startTimeHour}
          startTimeMinute={event.startTimeMinute}
          startTimeTod={event.startTimeTod}
          endTimeHour={event.endTimeHour}
          endTimeMinute={event.endTimeMinute}
          endTimeTod={event.endTimeTod}
          ticketedEvent={event.ticketedEvent}
          ticketPrice={event.ticketPrice}
          ticketsAvailable={event.ticketsAvailable}
          id={event._id}
        />
      ))}
    </div>
  );
};

/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

import {
  getNearbyWinePlaces,

} from "../../services/googlePlacesService";

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({});

  const fetchRooms = async () => {
    try {
      const data = await getNearbyWinePlaces();
      setRooms(data);
      console.log(rooms)
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch rooms from google places api | Before service file`
      );
    }
  };

  const fetchRoomDetails = async () => {
    try {
        console.log('fetching room details ')
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch room details from google place details api | Before service file`
      );
    }
  };

  return (
    <PlacesContext.Provider value={{ fetchRooms, fetchRoomDetails, rooms, roomDetails }}>
      {children}
    </PlacesContext.Provider>
  );
};

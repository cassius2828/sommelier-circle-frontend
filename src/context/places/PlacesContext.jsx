/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import {
  getNearbyWinePlaces,
  getPhotosOfRoom,
} from "../../services/googlePlacesService";
import useGlobalContext from "../global/useGlobalContext";

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  // const [events, setEvents] = useState([]);
  // const [eventDetails, setEventDetails] = useState({});
  const { isLoading, setIsLoading } = useGlobalContext();

  const fetchRoomsWithCoverPhoto = async () => {
    setIsLoading(true);
    try {
      const roomList = await getNearbyWinePlaces();
      const updatedPlacesWithPhoto = await Promise.all(
        roomList.map(async (room) => {
          if (room.photos[0].photo_reference) {
            const photo = await getPhotosOfRoom(room.photos[0].photo_reference);
            return { ...room, photo };
          }
          return room;
        })
      );
      console.log(updatedPlacesWithPhoto, ' <-- updatedPlaces')
      setRooms(updatedPlacesWithPhoto);
      console.log(rooms);
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch rooms from google places api | Before service file`
      );
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchRoomsWithCoverPhoto();
  }, []);

  const fetchRoomDetails = async () => {
    try {
      console.log("fetching room details ");
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to fetch room details from google place details api | Before service file`
      );
    }
  };

  return (
    <PlacesContext.Provider
      value={{  rooms, roomDetails }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

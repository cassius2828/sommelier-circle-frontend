///////////////////////////////
// Context Creation
//////////////////////////////

import { createContext, useReducer } from "react";
import {
  getExploreEventByCity,
  getExploreEvents,
  getUserEvents,
} from "../../services/eventService";
import useAuthContext from "../auth/useAuthContext";

export const EventsContext = createContext();

const initialEventsState = {
  exploreEvents: [],
  userEvents: [],
  displayEvents: [],
  eventsMessage: "test",
  eventDetails: {},
  eventFilter: {},
  eventForm: {
    // Basic Info
    photo: "",
    eventName: "",
    eventDescription: "",
    owner: null,

    // Location
    streetAddress: "",
    city: "",
    state: "",

    // Event Time
    date: "",
    startTimeHour: "1",
    startTimeMinute: "00",
    startTimeTod: "AM",
    endTimeHour: "1",
    endTimeMinute: "00",
    endTimeTod: "AM",

    // Contact
    email: "", // Prefill this from user profile if available
    phone: "", // Prefill this from user profile if available

    // Extra
    ticketedEvent: false,
    ticketsAvailable: 0,
    ticketPrice: 0,
  },
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    //  events message
    case "setEventsMessage/events":
      return { ...state, eventsMessage: action.payload, exploreEvents: [] };
    case "clearEventsMessage/events":
      return { ...state, eventsMessage: "" };
    // display events
    case "setDisplayEvents/events":
      return { ...state, displayEvents: action.payload };
    //   user events
    case "getUserEvents/events":
      return { ...state, userEvents: action.payload };
    //   explore events
    case "getExploreEvents/events":
      return { ...state, exploreEvents: action.payload };
    case "getEventsByCity/events":
      return { ...state, exploreEvents: action.payload };
    // loading state
    case "startLoading/events":
      return { ...state, isLoading: true };
    case "stopLoading/events":
      return { ...state, isLoading: false };

    default:
      break;
  }
};

export const EventsProvider = ({ children }) => {
  const [
    { exploreEvents, userEvents, displayEvents, eventDetails, eventForm,eventsMessage },
    dispatch,
  ] = useReducer(reducer, initialEventsState);
  const { user } = useAuthContext();
  ///////////////////////////
  //   Handle City Selection
  ///////////////////////////
  const handleSelectCityFilter = async (city) => {
    dispatch({ type: "startLoading/events" });
    try {
      const data = await getExploreEventByCity(city, user._id);
      dispatch({ type: "getEventsByCity/events", payload: data });
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to use service file to filter explore events by ${city}`
      );
    } finally {
      dispatch({ type: "stopLoading/events" });
    }
  };

  ///////////////////////////
  // GET | Explore Events
  ///////////////////////////
  const fetchExploreEvents = async (userId, searchQuery) => {
    dispatch({ type: "startLoading/events" });
    dispatch({ type: "clearEventsMessage/events" });

    try {
      const data = await getExploreEvents(userId, searchQuery);
      if (data.message) {
        return dispatch({
          type: "setEventsMessage/events",
          payload: data.message,
        });
      }
      dispatch({ type: "getExploreEvents/events", payload: data });

      //   setDisplayEvents(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to get user events from service function`);
    } finally {
      dispatch({ type: "stopLoading/events" });
    }
  };

  ///////////////////////////
  //   Set Display Events
  ///////////////////////////
  const setDisplayEvents = (events) => {
    dispatch({ type: "setDisplayEvents/events", payload: events });
  };

  ///////////////////////////
  // GET | User Events
  ///////////////////////////
  const fetchUserEvents = async (userId,searchQuery) => {
    dispatch({ type: "startLoading/events" });

    try {
      const data = await getUserEvents(userId,searchQuery);
      if (data.message) {
        return dispatch({
          type: "setEventsMessage/events",
          payload: data.message,
        });
      }
     

          dispatch({ type: "getUserEvents/events", payload: data });
      
      //   dispatch({ type: "setDisplayEvents/events", payload: data });
    } catch (err) {
      console.error(err);
      console.log(`Unable to get user events from service function`);
    } finally {
      dispatch({ type: "stopLoading/events" });
    }
  };

  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
    { code: "DC", name: "District of Columbia" },
    { code: "AS", name: "American Samoa" },
    { code: "GU", name: "Guam" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "PR", name: "Puerto Rico" },
    { code: "VI", name: "U.S. Virgin Islands" },
  ];
  return (
    <EventsContext.Provider
      value={{
        dispatch,
        exploreEvents,
        userEvents,
        displayEvents,
        eventDetails,
        states,
        eventForm,
        fetchExploreEvents,
        handleSelectCityFilter,
        setDisplayEvents,
        fetchUserEvents,eventsMessage
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EVENT_BASE_URL = BASE_URL + "/events";

///////////////////////////
// ? POST | Create Event Posting
///////////////////////////
export const postCreateEvent = async (formData, userId) => {
  const url = EVENT_BASE_URL + "/create";

  // add owner key value in formData | had issues appending owner to formData in create file
  const completeFormData = { ...formData, owner: userId };
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.post(url, completeFormData, options);
    // console.log(response, " <-- response");
    if (response.ok) {
      return response.data;
    }
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communicate with MongoDB to create new event posting`
    );
  }
};

///////////////////////////
// GET | Explore Events
///////////////////////////
export const getExploreEvents = async (userId, query) => {
  try {
    if (query) {
      const response = await axios.get(
        EVENT_BASE_URL + `?userId=${userId}&searchQuery=${query}`
      );
      console.log(response.data);
      if (response.data.message) {
        return response.data.message;
      }
      return response.data;
    } else {
      const response = await axios.get(EVENT_BASE_URL + `?userId=${userId}`);
      console.log(response.data);
      if (response.data.message) {
        return response.data.message;
      }
      return response.data;
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      // Handle the error response from the server
      console.log("Error response:", err.response);
      return { error: true, message: err.response.data.message };
    } else {
      console.error(err);
      return {
        error: true,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

///////////////////////////
// GET | User Events
///////////////////////////

export const getUserEvents = async (userId, searchQuery) => {

  try {
    if (searchQuery) {
      const url =
        EVENT_BASE_URL +
        `/user-events/?userId=${userId}&searchQuery=${searchQuery}`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.message) {
        return response.data.message;
      }
      return response.data;
    } else {
      const url = EVENT_BASE_URL + `/user-events/?userId=${userId}`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.message) {
        return response.data.message;
      }
      return response.data;
    }
  } catch (err)  {
    if (err.response && err.response.data && err.response.data.message) {
      // Handle the error response from the server
      console.log("Error response:", err.response);
      return { error: true, message: err.response.data.message };
    } else {
      console.error(err);
      return {
        error: true,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

///////////////////////////
// GET | Event Details
///////////////////////////

export const getEventDetails = async (eventId) => {
  const url = EVENT_BASE_URL + `/${eventId}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with MongoDb to get all user events`);
  }
};

///////////////////////////
// * PUT | Edit Event
///////////////////////////

export const putEditEvent = async (formData, eventId, userId) => {
  const url = EVENT_BASE_URL + `/${eventId}`;
  const completeFormData = { ...formData, owner: userId };
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.put(url, completeFormData, options);

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with MongoDb to edit user event`);
  }
};

///////////////////////////
// GET | Filter Event By City
///////////////////////////

export const getExploreEventByCity = async (city, userId) => {
  const url =
    EVENT_BASE_URL + `/filter-events/city/?userId=${userId}&city=${city}`;

  try {
    const response = await axios.get(url);

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with MongoDb to filter explore events`);
  }
};

// export const getEventByNameSearch = async (query) => {
//   try {
//     const response = await axios.get(EVENT_BASE_URL + `?searchQuery=${query}`)
//   } catch (err) {
//     console.error(err);
//     console.log(`Unable to communicate with MongoDb to filter explore events by name search`);
//   }

// }

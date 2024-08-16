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
export const getExploreEvents = async (userId) => {
  try {
    const response = await axios.get(EVENT_BASE_URL + `?userId=${userId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communicate with MongoDb to get all non user events`
    );
  }
};

///////////////////////////
// GET | User Events
///////////////////////////

export const getUserEvents = async (userId) => {
  const url = EVENT_BASE_URL + `/user-events/?userId=${userId}`;
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

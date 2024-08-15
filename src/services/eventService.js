import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EVENT_BASE_URL = BASE_URL + "/events";

///////////////////////////
// ? POST | Create Event Posting
///////////////////////////
export const postCreateEvent = async (formData) => {
  const url = EVENT_BASE_URL + "/create";
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.post(url, formData, options);
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

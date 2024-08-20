import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const CRITICS_BASE_URL = BASE_URL + "/critics";

///////////////////////////
// GET | All Critics
///////////////////////////
export const getAllCritics = async (page) => {
  try {
    const response = await axios.get(CRITICS_BASE_URL + `?page=${page}`);
    if (response.data.message) {
      return response.data.message;
    }
    return response.data;
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
// GET | All Critics
///////////////////////////
export const getFeaturedCritics = async () => {
  try {
    const response = await axios.get(CRITICS_BASE_URL + "/featured");
    if (response.data.message) {
      return response.data.message;
    }
    return response.data;
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
// GET | Critic Details
///////////////////////////
export const getCriticDetails = async (id) => {
  try {
    const response = await axios.get(CRITICS_BASE_URL + "/" + id);
    if (response.data.message) {
      return response.data.message;
    }
    return response.data;
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
// GET | CriticsCount
///////////////////////////
export const getCriticsCount = async () => {
  try {
    const response = await axios.get(CRITICS_BASE_URL + "/count");
    if (response.data.message) {
      return response.data.message;
    }
    return response.data;
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

import axios from "axios";

const WINE_BASE_URL = `http://localhost:3000/wines`;

///////////////////////////
// Get | get all wines
///////////////////////////
export const getWines = async () => {
  try {
    const response = await axios.get(`${WINE_BASE_URL}/search`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Could not communicate with db to retrieve wines`);
    throw err;
  }
};

///////////////////////////
// GET | Get selected wine
///////////////////////////
export const getSelectedWine = async (id) => {
  try {
    const response = await axios.get(`${WINE_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Could not communicate with db to retrieve selected wine`);
    throw err;
  }
};
///////////////////////////
// ? POST | filter wine results -- break down formdata in server
///////////////////////////

export const postFilterWineResults = async (formData) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${WINE_BASE_URL}/search`,
      formData,
      options
    );
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Could not communicate with db to filter wine results`);
    throw err;
  }
};

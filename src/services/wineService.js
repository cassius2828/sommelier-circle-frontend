import axios from "axios";

const WINE_BASE_URL = `http://localhost:3000/wines`;

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

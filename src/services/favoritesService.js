import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FAVS_BASE_URL = BASE_URL + "/favorites";

///////////////////////////
// ? POST | Add Item to Favorites List
///////////////////////////
export const addItemToFavorites = async (userId, itemId, itemType) => {
  const data = {
    userId,
    itemId,
  };

  try {
    const response = await axios.post(FAVS_BASE_URL + `/${itemType}`, data);

    return response.data.message;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.log(
        err.response.data.error,
        " <-- error from the response data object"
      );
      return err.response.data.error; // Return the error message from the server
    }
    console.error(err);
    console.log(
      `Unable to communicate with backend to add ${itemType.slice(
        0,
        -1
      )} to favorites list`
    );
  }
};

///////////////////////////
// ! DELETE | Remove Item From Favorites
///////////////////////////
export const deleteRemoveItemFromFavorites = async (
  userId,
  itemId,
  itemType
) => {
  const data = {
    userId,
    itemId,
  };

  try {
    const response = await axios.delete(FAVS_BASE_URL + `/${itemType}`, data);

    return response.data.message;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.log(
        err.response.data.error,
        " <-- error from the response data object"
      );
      return err.response.data.error; // Return the error message from the server
    }
    console.error(err);
    console.log(
      `Unable to communicate with backend to add ${itemType.slice(
        0,
        -1
      )} to favorites list`
    );
  }
};

///////////////////////////
// GET | Favorite Items
///////////////////////////
export const getFavoriteItems = async (userId, itemType) => {
  try {
    const response = await axios.get(
      `${FAVS_BASE_URL}/${itemType}?userId=${userId}`
    );
    if (response.data.message) {
      return response.data.message;
    }

    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communicate with backend to get all favorites of ${itemType}`
    );
  }
};

///////////////////////////
// ? POST | Add Item to Favorites List | LOCATIONS
///////////////////////////
export const addLocationsItemToFavorites = async (userId, placeId) => {
  const data = {
    userId,
    placeId,
  };

  try {
    const response = await axios.post(FAVS_BASE_URL + `/locations`, data);

    return response.data.message;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.log(
        err.response.data.error,
        " <-- error from the response data object"
      );
      return err.response.data.error; // Return the error message from the server
    }
    console.error(err);
    console.log(
      `Unable to communicate with backend to add location favorites list`
    );
  }
};

///////////////////////////
// ! DELETE | Remove Item From Favorites | LOCATIONS
///////////////////////////
export const deleteLocationsRemoveItemFromFavorites = async (
  userId,
  placeId
) => {
  const data = {
    userId,
    placeId,
  };

  try {
    const response = await axios.delete(FAVS_BASE_URL + `/locations`, data);

    return response.data.message;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.log(
        err.response.data.error,
        " <-- error from the response data object"
      );
      return err.response.data.error; // Return the error message from the server
    }
    console.error(err);
    console.log(
      `Unable to communicate with backend to add location to favorites list`
    );
  }
};

///////////////////////////
// GET | Favorite Items | LOCATIONS
///////////////////////////
export const getLocationsFavoriteItems = async (userId) => {
  try {
    const response = await axios.get(
      `${FAVS_BASE_URL}/locations?userId=${userId}`
    );

    if (response.data.message) {
      return response.data.message;
    }
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communicate with backend to get all favorites of location`
    );
  }
};

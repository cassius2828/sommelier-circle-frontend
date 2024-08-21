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
    if (response.data.err) {
      return response.data.err;
    }
    return response.data.message;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communicate with backend to add ${itemType.slice(
        0,
        -1
      )}  to favorites list`
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
    if (response.data.error) {
      return response.data.error;
    }
    return response.data.message;
  } catch (err) {
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
      `${BASE_URL}/${itemType}?userId=${userId}`
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

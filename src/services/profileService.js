import axios from "axios";
import { refreshToken } from "./authService";

const BASE_URL = "http://localhost:3000/profiles";

/////////////////////
// Get Profile Service Function
/////////////////////
// export async function getProfileService(id) {
//   try {
//     const options = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     };
//     const response = await axios.get(`${BASE_URL}/${id}`, options);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     throw error;
//   }
// }

// POST
// headers: {
// 	'Authorization': 'Bearer ' + localStorage.getItem('token'),
// 	'Content-type': 'application/json'
// }

export const postFollowUser = async (userId, targetedUserId) => {
  if (!userId || !targetedUserId)
    return console.error(
      `Missing one of the id fields: userId: ${userId}, targetedUserId: ${targetedUserId}`
    );

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/${userId}/follow/${targetedUserId}`,
      {},
      options
    );
    return response.data;
  } catch (err) {
    console.error("Error following targeted user:", err);
    throw err;
  }
};

export const postUnfollowUser = async (userId, targetedUserId) => {
  if (!userId || !targetedUserId)
    return console.error(
      `Missing one of the id fields: userId: ${userId}, targetedUserId: ${targetedUserId}`
    );
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/unfollow/${targetedUserId}`,
      {},
      options
    );
    return response.data;
  } catch (err) {
    console.error("Error following targeted user:", err);
    throw err;
  }
};

export const getUserDoc = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    // const token = await refreshToken();
    const response = await axios.get(`${BASE_URL}/${id}`, {}, options);
    return response.data;
  } catch (err) {
    console.error("Error getting targeted user info:", err);
    throw err;
  }
};

export const getSearchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${query}`);
    return response.data;
  } catch (err) {
    console.error("Error searching and retrieving users:", err);
    throw err;
  }
};

export const checkIfFollowing = async (currentUser, targetedUserId) => {
  if (!currentUser) return;
  for (const user of currentUser.following) {
    if (user.toString() === targetedUserId) return true;
  }
  return false;
};

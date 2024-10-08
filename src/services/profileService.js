import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "/profiles";

/////////////////////
// Get Profile Service Function
/////////////////////
export async function getProfileService(id) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/${id}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

/////////////////////
// ? POST | Follow User
/////////////////////
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

/////////////////////
// ? POST | Unfollow User
/////////////////////
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

///////////////////////////
// GET | User Doc
///////////////////////////
export const getUserDoc = async (id) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {}, options);
    return response.data;
  } catch (err) {
    console.error("Error getting targeted user info:", err);
    throw err;
  }
};

///////////////////////////
// GET | Search Users
///////////////////////////
export const getSearchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${query}`);
    return response.data;
  } catch (err) {
    console.error("Error searching and retrieving users:", err);
    throw err;
  }
};

///////////////////////////
// Check if Following
///////////////////////////
export const checkIfFollowing = async (currentUser, targetedUserId) => {
  if (!currentUser) return;
  for (const user of currentUser.following) {
    if (user.toString() === targetedUserId) return true;
  }
  return false;
};

///////////////////////////
// * PUT | Update Profile Info
///////////////////////////

export const putEditProfileInfo = async (userId, formData) => {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.put(
      `${BASE_URL}/${userId}`,
      formData,
      options
    );

    if (response.data.message) {
      return response.data.message;
    }
    // console.log(response.data, ' <-- res.data')
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Unable to communicate with MongoDB to update user doc with ID ${userId}. Error: ${err}`
    );
  }
};

///////////////////////////
// PUT * | Update Password
///////////////////////////
export const putUpdatePassword = async (formData, userId) => {
  const url = `${BASE_URL}/${userId}/update-password`
try {
  const response = await axios.put(url, formData);
  console.log(response.data, ' <-- response.data Service')
  return response.data
} catch (err) {
  console.error(err);
  console.log(`Unable to communicate with server to update password`);
  return err
}
}

///////////////////////////
// GET | Check user social media status
///////////////////////////

export const getCheckUserSocialMediaStatus = async (userId, platform) => {
  try {
    const response = await axios.get(`${BASE_URL}/social-media/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(
      `Cannot communciate with backend to check if user has filled out info in profile for ${platform}`
    );
  }
};

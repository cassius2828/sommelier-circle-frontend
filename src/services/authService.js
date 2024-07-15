import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL

/////////////////////
// User Signup Function
/////////////////////
export async function signup(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, formData);

    const data = response.data;
    if (data.err) {
      throw new Error(data.err);
    }

    console.log(data.token, " < - data.token");

    if (data.token) {
      // store the token! in localstorage
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));
      console.log(user, " <- user in signup!");
      return user.user;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

/////////////////////
// User Signin Function
/////////////////////
export async function signin(userCredentials) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      userCredentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.error) {
      throw new Error(data.error);
    }

    if (data.token) {
      // store the token! in localstorage
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));
      return user.user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/////////////////////
// Get User Function
/////////////////////
export function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user.user;
}


export const refreshToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/refresh-token`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    console.error('Error refreshing token:', err);
  }
};

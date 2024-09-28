import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/////////////////////
// ? POST | User Signup Function
/////////////////////
export async function signup(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, formData);

    const data = response.data;
    if (data.err) {
      throw new Error(data.err);
    }

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
  const LsToken = localStorage.getItem("token");
  // if no ls token then look for cookie token
  if (!LsToken || LsToken === "undefined") {
    const cookieToken = Cookies.get("jwt");
    console.log(cookieToken, ' <-- cookie Token')
    // if no cookie token then return null
    if (!cookieToken || cookieToken === "undefined") {
      return null;
    }
    // else set the local storage to the cookie token, parse the token, and return the parsed token
    else {
      // set the local storage as the cookie token
      localStorage.setItem("token", cookieToken);
      const newLsToken = localStorage.getItem("token");
      const user = JSON.parse(atob(newLsToken.split(".")[1]));
      return user.user;
    }
  }
  // if there was a local storage token, the parse and return the token
  const user = JSON.parse(atob(LsToken.split(".")[1]));
  return user.user;
}

///////////////////////////
// ! Delete Cookie Token
///////////////////////////
export const deleteJwtCookie = () => {
  try {
    Cookies.remove("jwt");
  } catch (err) {
    console.error(err);
    console.log(`Unable to remove cookie token of name "jwt"`);
  }
};

/////////////////////
// Refresh Token
/////////////////////
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    console.error("Error refreshing token:", err);
  }
};

///////////////////////////
// GET | Token From Google OAuth Login
///////////////////////////

export const getTokenFromGoogleOAuth = async () => {
  console.log("trying to fetch user from google OAuth");
  try {
    const response = await axios.get(`${BASE_URL}/auth/token`, {
      withCredentials: true,
    });

    if (response.data) {
      getUser();
    } else return { message: "User was not authenitcated with google OAuth" };
  } catch (err) {
    console.error(`Error obtaining token err: ${err}`);
  }
};

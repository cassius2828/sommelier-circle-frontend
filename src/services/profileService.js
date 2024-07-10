import axios from "axios";

const BASE_URL = "http://localhost:3000/profiles";

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

// POST
// headers: {
// 	'Authorization': 'Bearer ' + localStorage.getItem('token'),
// 	'Content-type': 'application/json'
// }

const BASE_URL = "http://localhost:3000/profiles";

export async function getProfileService(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await response.json();
  return data;
}

// POST
// headers: {
// 	'Authorization': 'Bearer ' + localStorage.getItem('token'),
// 	'Content-type': 'application/json'
// }

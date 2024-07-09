
const BASE_URL = 'http://localhost:3000/profiles'


async function getProfile(id){

	try {
		const response = await fetch(`${BASE_URL}/${id}`, 
		{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}
		)

		const data = await response.json()
		return data
	} catch(err){
		throw err
	}
}


// POST
// headers: {
// 	'Authorization': 'Bearer ' + localStorage.getItem('token'),
// 	'Content-type': 'application/json'
// }

export {
	getProfile
}

const BACKEND_URL = 'http://localhost:3000'

async function signup(formData){
	try {
		const response = await fetch(`${BACKEND_URL}/users/signup`, {
			method: 'POST',
			// we need to let the server know we are sending json
			// headers: {
			// 	'Content-Type': 'application/json'
			// },
			// If we are sending a multipart/form-data request (aka sending a file, we need to send FormData, check the 
			// handleSubmit in the signup page and json, and we don't have to set the content-type in the headers, 
			// because the browser will automatically apply them for us!


			body: formData
		})

		const data = await response.json()
		if(data.err){
			throw new Error(data.err)
		}

		console.log(data.token, " < - data.token")

		if(data.token){

			// store teh token! in localstorage
			localStorage.setItem('token', data.token)
			// 1. data.split('.')[1]
			// grabbing the payload in our token (the middle section)
			// 2. atob(result of data.split) 
			// is decoding the token it a the json string
			// 3. JSON.parse(result of the atob)
			// taking the json and turning it into a js object!
			const user = JSON.parse(atob(data.token.split('.')[1]))
			console.log(user, ' <- user in signup!')
			return user.user
		}
		

	} catch(err){
		console.log(err)
		throw new Error(err)
	}
}


async function signin(userCredentials){
	try {
		const response = await fetch(`${BACKEND_URL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userCredentials)	
		})

		const data = await response.json()
		if(data.error){
			throw new Error(data.error)
		}

		// hopefully the data is our token!
		if(data.token){
			// store teh token! in localstorage
			localStorage.setItem('token', data.token)

			// not the user
			const user = JSON.parse(atob(data.token.split('.')[1]))
			return user.user
		}
		
	} catch(err){
		 console.log(err)
		 throw err
	}
}

function getUser(){
	const token = localStorage.getItem('token')
	if(!token) return null
	const user = JSON.parse(atob(token.split('.')[1]))
	return user.user
}

export {
	signup,
	signin,
	getUser
}
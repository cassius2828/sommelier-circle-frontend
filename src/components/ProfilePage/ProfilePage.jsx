import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import * as profileService from '../../services/profileService'

export default function ProfilePage(){

	const { userId } = useParams()
	const [photo, setPhoto] = useState('')

	useEffect(() => {
		console.log(userId)
		console.log('useeffect is running')

		async function getProfile(){
			try {
				const userProfile = await profileService.getProfile(userId)
				console.log(userProfile)
			} catch(err){
				console.log(err)
			}
		}

		getProfile()

	}, [])


	function handleFileInput(e){
		console.log(e.target.files)
		setPhoto(e.target.files[0])
	}

	return(
		<>
			<h1>Profile Page!</h1>
			
			<form action="">
				<label htmlFor="upload-photo"></label>
				<input type="file" id='upload-photo' onChange={handleFileInput}/>
				<button>Upload</button>
			</form>
		</>
		
	)
}
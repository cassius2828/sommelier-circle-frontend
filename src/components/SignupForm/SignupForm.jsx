// SignupForm.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService'

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const [photo, setPhoto] = useState('')

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMessage('');
    console.log(formData); // this line will print the form data to the console

    // We need to create FormData, because we have to send a multipart/form-data request 
    const dataToSendToServer = new FormData()
    dataToSendToServer.append('photo', photo)
    dataToSendToServer.append('username', formData.username)
    dataToSendToServer.append('password', formData.password)

	try {
		const user = await authService.signup(dataToSendToServer)
		console.log(user)
		props.setUser(user)
		navigate('/')
	} catch(err){
		console.log(err)
	}
	

  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  function handleFileInput(e){
    console.log(e.target.files)
    setPhoto(e.target.files[0])
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="profile-pic">Profile Picture:</label>
          <input type="file" onChange={handleFileInput} />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;

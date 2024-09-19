import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// services
import { signup } from "../../services/authService";
//  context
import useAuthContext from "../../context/auth/useAuthContext";

const SignupForm = () => {
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });
  const { username, email, password, passwordConf } = formData;
  // hooks
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  ///////////////////////////
  // Update Message
  ///////////////////////////
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  ///////////////////////////
  // Handle Change
  ///////////////////////////
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  ///////////////////////////
  // Handle Submit
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMessage("");

    // We need to create FormData, because we have to send a multipart/form-data request
    const dataToSendToServer = new FormData();
    dataToSendToServer.append("photo", photo);
    dataToSendToServer.append("username", formData.username);
    dataToSendToServer.append("email", formData.email);
    dataToSendToServer.append("password", formData.password);

    try {
      const user = await signup(dataToSendToServer);
      console.log(user);
      setUser(user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////
  // Form Validation
  ///////////////////////////
  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  ///////////////////////////
  // Hanlde File Input
  ///////////////////////////
  function handleFileInput(e) {
    console.log(e.target.files);
    setPhoto(e.target.files[0]);
  }

  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-start md:justify-center mt-52 md:mt-0">
      <div className="bg-theme-darkest border-gray-400 border-2 p-8 rounded-lg shadow-md w-full max-w-md mt-20">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">Sign Up</h1>
        <p className="text-gray-100 mb-4 text-center">{message}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* username */}
          <div>
            <label htmlFor="username" className="block text-gray-100 mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* email */}
          <div>
            <label htmlFor="email" className="block text-gray-100 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* password */}
          <div>
            <label htmlFor="password" className="block text-gray-100 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* confirm password */}
          <div>
            <label htmlFor="confirm" className="block text-gray-100 mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* profile picture */}
          <div>
            <label htmlFor="profile-pic" className="block text-gray-100 mb-2">
              Profile Picture:
            </label>
            <input
              type="file"
              id="profile-pic"
              onChange={handleFileInput}
              className="w-full p-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* action btns */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isFormInvalid()}
              className="bg-stone-500  px-4 py-2 rounded-md focus:outline-none hover:bg-stone-600 hover:text-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Sign Up
            </button>
            <Link to="/">
              <button className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;

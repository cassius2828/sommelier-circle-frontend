import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// services
import { getTokenFromGoogleOAuth, signin } from "../../services/authService";
// context
import useAuthContext from "../../context/auth/useAuthContext";

const SigninForm = () => {
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // hooks
  const { setUser } = useAuthContext();
  const navigate = useNavigate(); // added this for navigation purposes
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
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  ///////////////////////////
  // Handle Submit
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signin(formData); // TODO build signin service function
      setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.response.data.error);
    }
  };
  ///////////////////////////
  // Fetch User From Google OAuth
  ///////////////////////////
  const fetchUserFromGoogleOAuth = async () => {
    const data = await getTokenFromGoogleOAuth();
    setUser(data);
  };

  ///////////////////////////
  // Handle Google Login
  ///////////////////////////
  const handleGoogleLogin = () => {
    fetchUserFromGoogleOAuth();
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-start md:justify-center mt-52 md:mt-0">
      <div className="bg-theme-darkest border-gray-400 border-2 p-8 rounded-lg shadow-md w-full max-w-md mt-20">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">Log In</h1>
        <p className="text-gray-100 mb-4 text-center">{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          {/* username */}
          <div>
            <label htmlFor="username" className="block text-gray-100 mb-2">
              Username:
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
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
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
            />
          </div>
          {/* action btns */}
          <div className="flex justify-between items-center">
            <Link to="/">
              <button
                type="button"
                className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="bg-stone-500  px-4 py-2 rounded-md focus:outline-none hover:bg-stone-600 hover:text-gray-100 transition-colors duration-200"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      {/* google sign in */}
      <button
        onClick={handleGoogleLogin}
        className="border-gray-100 bg-theme-darkest rounded-md text-3xl text-gray-100 border mt-20 px-6 py-3"
      >
        Sign in With Google
      </button>
    </main>
  );
};

export default SigninForm;

/* eslint-disable react/prop-types */
// SigninForm

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/authService";
import useAuthContext from "../../context/auth/useAuthContext";

const SigninForm = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate(); // added this for navigation purposes
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signin(formData); // TODO build signin service function
      console.log(user, " <- response sign in");
      setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-center">
      <div className="bg-theme-darkest border-gray-400 border-2 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">Log In</h1>
        <p className="text-gray-100 mb-4 text-center">{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-stone-500  px-4 py-2 rounded-md focus:outline-none hover:bg-stone-600 hover:text-gray-100 transition-colors duration-200"
            >
              Log In
            </button>
            <Link to="/">
              <button
                type="button"
                className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SigninForm;

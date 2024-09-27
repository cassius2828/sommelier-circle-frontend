import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";
import { putUpdatePassword } from "../../services/profileService";
const initialFormData = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [inputError, setInputError] = useState({});
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // hooks
  const { user } = useAuthContext();
  const { userId } = useParams();
  const navigate = useNavigate();
  //   vars
  const { password, newPassword, confirmPassword } = formData;

  ///////////////////////////
  //   Handle Submit
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setFormError("new password must match confirmed password");
    }
    if (!password || !newPassword || !confirmPassword) {
      setFormError("Please fill out all fields");
    }

    setFormError("");
    try {
      const data = await putUpdatePassword(formData, userId);

      if (data?.message) {
        setMessage(data.message);
        setFormData(initialFormData);
        return;
      }
      if (data?.error) {
        setError(data.error);
        return;
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to communicate with service to update password `);
      setError(err.message);
    }
  };
  ///////////////////////////
  // Handle Change
  ///////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputError({ ...inputError, [name]: value.length < 1 });
  };

  ///////////////////////////
  //   Handle New Passwords Not Matching Errors
  ///////////////////////////
  useEffect(() => {
    const isMismatch = confirmPassword !== newPassword;
    const hasLength = confirmPassword.length > 0 && newPassword.length > 0;

    setInputError((prev) => ({
      ...prev,
      confirmPassword: isMismatch || !hasLength,
      newPassword: isMismatch || !hasLength,
    }));
  }, [confirmPassword, newPassword]);
  ///////////////////////////
  //   If this is not the signed in user, then navigate away from the page
  ///////////////////////////
  useEffect(() => {
    if (user._id !== userId) {
      navigate(`/profiles/${userId}`);
    }
  }, [userId]);
  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-center mt-52 md:mt-0">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-[60rem]  md:mt-80">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">
          Change Password
        </h1>
        {formError && (
          <span className="text-red-500 text-xl flex justify-center">
            {formError}
          </span>
        )}
        {message && (
          <span className="text-green-500 text-xl flex justify-center">
            {message}
          </span>
        )}
        {error && (
          <span className="text-red-500 text-xl flex justify-center">
            {error}
          </span>
        )}
        <form className="space-y-8 p-6 bg-gray-800 rounded-lg w-full flex flex-col  items-center gap-12">
          {/* col 1 */}
          <div className="w-full md:w-1/2">
            {/* password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-100 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className={`w-full p-2 border text-xl ${
                  inputError.password ? "border-red-500" : "border-gray-300"
                }  text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]`}
              />
            </div>{" "}
            {/* new Password */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-100 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                className={`w-full p-2 border text-xl ${
                  inputError.newPassword ? "border-red-500" : "border-gray-300"
                }  text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]`}
              />
            </div>
            {/* confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-100 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border text-xl ${
                  inputError.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }  text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]`}
              />
            </div>
          </div>
        </form>{" "}
        {/* confirm changes */}
        <div className="flex justify-center items-center gap-12">
          <Link to={`/profiles/${userId}`}>
            <button className="bg-stone-500 px-4 py-2 rounded-md text-xl text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer">
              Back to Profile
            </button>
          </Link>

          <Link to={`/profiles/${userId}/edit`}>
            <button className="bg-stone-500 px-4 py-2 rounded-md text-xl text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer">
              Edit Profile
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            className="bg-stone-500 px-4 py-2 rounded-md text-xl text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </div>
    </main>
  );
};
export default ChangePassword;

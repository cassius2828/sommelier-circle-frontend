import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileService } from "../../services/profileService";
// import { getProfileService } from "../../services/profileService";

const initialFormData = {
  photo: null,
  username: "",
  email: "",
  socialMedia: [
    { twitter: "" },
    { isntagram: "" },
    { facebook: "" },
    { linkedIn: "" },
  ],
};

export default function EditProfile() {
  const { userId } = useParams();
  // const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
  };
  const { photo, username, email, twitter, instagram, facebook, linkedin } =
    formData;

  useEffect(() => {
    async function getProfile() {
      try {
        const userProfile = await getProfileService(userId);
        setFormData(userProfile);
        console.log(userProfile)
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [userId]);

  function handleFileInput(e) {
    console.log(e.target.files);
    setFormData({ ...formData, photo: e.target.files[0] });
  }

  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-[60rem] mt-80">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">
          Profile Page!
        </h1>
        <form className="space-y-8 p-6 bg-gray-800 rounded-lg w-full flex items-center gap-12">
          {/* col 1 */}
          <div className="w-full md:w-1/2">
            {/* photo */}
            <div className="mb-4">
              <label
                htmlFor="upload-photo"
                className="block text-gray-100 mb-2"
              >
                Upload Photo:
              </label>
              <input
                type="file"
                id="upload-photo"
                name="photo"
                onChange={handleFileInput}
                className="w-full p-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-100 mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-100 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
          </div>
          {/* col 2 */}
          <div className="w-full md:w-1/2">
            {/* twitter */}
            <div className="mb-4">
              <label htmlFor="twitter" className="block text-gray-100 mb-2">
                Twitter:
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={twitter}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* instagram */}
            <div className="mb-4">
              <label htmlFor="instagram" className="block text-gray-100 mb-2">
                Instagram:
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={instagram}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* facebook */}
            <div className="mb-4">
              <label htmlFor="facebook" className="block text-gray-100 mb-2">
                Facebook:
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={facebook}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* linked in */}
            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-gray-100 mb-2">
                LinkedIn:
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={linkedin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
          </div>
        </form>{" "}
        {/* confirm changes */}
        <div className="flex justify-center items-center">
          <button className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer">
            Confirm Changes
          </button>
        </div>
      </div>
    </main>
  );
}

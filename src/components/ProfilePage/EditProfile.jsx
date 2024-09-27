import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// service
import {
  getProfileService,
  putEditProfileInfo,
} from "../../services/profileService";
// components
import { Icon } from "../Icons/Social-Icons";
// inital Form Data
const initialFormData = {
  profileImg: "",
  username: "",
  displayedName: "",
  email: "",
  socialMedia: {
    twitter: {
      username: "",
      link: "",
    },
    instagram: {
      username: "",
      link: "",
    },
    facebook: {
      username: "",
      link: "",
    },
    linkedin: {
      username: "",
      link: "",
    },
  },
};

export default function EditProfile() {
  const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  // hooks
  const { userId } = useParams();
  const navigate = useNavigate();

  ///////////////////////////
  // Handle Change
  ///////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {
    profileImg,
    username,
    displayedName,
    email,
    socialMedia = {},
  } = formData || {};
  const { twitter, instagram, facebook, linkedin } = socialMedia || {};
  ///////////////////////////
  // Handle File Input
  ///////////////////////////
  function handleFileInput(e) {
    setPhoto(e.target.files[0]);
  }

  ///////////////////////////
  // Handle Submit
  ///////////////////////////
  const handleSubmit = async () => {
    const dataToSendToServer = new FormData();
    dataToSendToServer.append("photo", photo);
    dataToSendToServer.append("username", formData.username);
    dataToSendToServer.append("displayedName", formData.displayedName);
    dataToSendToServer.append("email", formData.email);
    dataToSendToServer.append("twitterUsername", twitter?.username);
    dataToSendToServer.append("twitterLink", twitter?.link);
    dataToSendToServer.append("instagramUsername", instagram?.username);
    dataToSendToServer.append("instagramLink", instagram?.link);
    dataToSendToServer.append("facebookUsername", facebook?.username);
    dataToSendToServer.append("facebookLink", facebook?.link);
    dataToSendToServer.append("linkedinUsername", linkedin?.username);
    dataToSendToServer.append("linkedinLink", linkedin?.link);
    try {
      const data = await putEditProfileInfo(userId, dataToSendToServer);
      if (data?.message) {
        alert(data.message);
      } else {
        navigate(`/profiles/${userId}`);
      }
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to use service file to communicate with backend to update user profile. Error: ${err}`
      );
    }
  };

  ///////////////////////////
  // Handle Social Media Change
  ///////////////////////////
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;

    // Determine the social media platform and field (username or link)
    const [platform, field] = name.split(/(?=[A-Z])/);

    setFormData((prevState) => ({
      ...prevState,
      socialMedia: {
        ...prevState.socialMedia,
        [platform]: {
          ...prevState.socialMedia[platform],
          [field.toLowerCase()]: value,
        },
      },
    }));
  };

  ///////////////////////////
  // Get profile and set user data
  ///////////////////////////
  useEffect(() => {
    async function getProfile() {
      try {
        const userProfile = await getProfileService(userId);
        setFormData(userProfile);
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [userId]);
  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-center mt-52 md:mt-0">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-[60rem]  md:mt-80">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">
          Profile Page!
        </h1>
        <form className="space-y-8 p-6 bg-gray-800 rounded-lg w-full flex flex-col md:flex-row items-center gap-12">
          {/* col 1 */}
          <div className="w-full md:w-1/2">
            {/* photo */}
            <div>
              <label className=" text-xl text-gray-100 mb-2 flex items-center gap-4">
                Current Profile Image:
              </label>
              <img
                className="w-40"
                src={profileImg}
                alt={username + " avatar"}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="upload-photo"
                className="block text-xl text-gray-100 mb-2"
              >
                Upload New Photo:
              </label>
              <input
                type="file"
                id="upload-photo"
                name="photo"
                onChange={handleFileInput}
                className="w-full p-2 border text-xl border-gray-300 text-gray-100 rounded-md focus:outline-none focus:border-[#e8d1ae]"
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
                className="w-full p-2 border text-xl border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* displayedName */}
            <div className="mb-4">
              <label
                htmlFor="displayedName"
                className="block text-xl text-gray-100 mb-2"
              >
                Displayed Name:
              </label>
              <input
                type="text"
                id="displayedName"
                name="displayedName"
                value={displayedName}
                onChange={handleChange}
                className="w-full p-2 border text-xl border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
            {/* email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl text-gray-100 mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full p-2 border text-xl border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
          </div>
          {/* //* col 2 */}
          <div className="w-full md:w-1/3">
            {/* Twitter */}
            <div className="mb-4">
              <label
                htmlFor="twitterUsername"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4"
              >
                <Icon type="twitter" size="sm" color="#0077B5" />
                Twitter Username:
              </label>
              <input
                type="text"
                id="twitterUsername"
                name="twitterUsername"
                value={twitter?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="twitterLink"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="twitter" size="sm" color="#0077B5" />
                Twitter Link:
              </label>
              <input
                type="text"
                id="twitterLink"
                name="twitterLink"
                value={twitter?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>

            {/* Instagram */}
            <div className="mb-4">
              <label
                htmlFor="instagramUsername"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4"
              >
                <Icon type="instagram" size="sm" color="#E1306C" />
                Instagram Username:
              </label>
              <input
                type="text"
                id="instagramUsername"
                name="instagramUsername"
                value={instagram?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="instagramLink"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="instagram" size="sm" color="#E1306C" />
                Instagram Link:
              </label>
              <input
                type="text"
                id="instagramLink"
                name="instagramLink"
                value={instagram?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
          </div>
          {/* col 3 */}
          <div className="w-full md:w-1/3">
            {/* Facebook */}
            <div className="mb-4">
              <label
                htmlFor="facebookUsername"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4"
              >
                <Icon type="facebook" size="sm" color="#3b5998" />
                Facebook Username:
              </label>
              <input
                type="text"
                id="facebookUsername"
                name="facebookUsername"
                value={facebook?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="facebookLink"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="facebook" size="sm" color="#3b5998" />
                Facebook Link:
              </label>
              <input
                type="text"
                id="facebookLink"
                name="facebookLink"
                value={facebook?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>

            {/* linkedin */}
            <div className="mb-4">
              <label
                htmlFor="linkedinUsername"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="linkedin" size="sm" color="#0077B5" />
                linkedin Username:
              </label>
              <input
                type="text"
                id="linkedinUsername"
                name="linkedinUsername"
                value={linkedin?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="linkedinLink"
                className=" text-xl text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="linkedin" size="sm" color="#0077B5" />
                linkedin Username:
              </label>
              <input
                type="text"
                id="linkedinLink"
                name="linkedinLink"
                value={linkedin?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
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
          <Link to={`/profiles/${userId}/update-password`}>
            <button className="bg-stone-500 px-4 py-2 rounded-md text-xl text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer">
              Change Password
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            className="bg-stone-500 px-4 py-2 rounded-md text-xl text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
          >
            Confirm Changes
          </button>
        </div>
      </div>
    </main>
  );
}

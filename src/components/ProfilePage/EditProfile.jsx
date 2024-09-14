import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProfileService,
  putEditProfileInfo,
} from "../../services/profileService";
// import { getProfileService } from "../../services/profileService";
import { Icon } from "../Icons/Social-Icons";

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
    linkedIn: {
      username: "",
      link: "",
    },
  },
};

export default function EditProfile() {
  const { userId } = useParams();
  const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(value);
  };
  const { profileImg, username, email, socialMedia, displayedName } = formData;

  useEffect(() => {
    async function getProfile() {
      try {
        const userProfile = await getProfileService(userId);
        setFormData(userProfile);
        console.log(userProfile);
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [userId]);

  function handleFileInput(e) {
    console.log(e.target.files, " file target");
    setPhoto(e.target.files[0]);
  }

  const handleSubmit = async () => {
    const dataToSendToServer = new FormData();
    dataToSendToServer.append("photo", photo);
    dataToSendToServer.append("username", formData.username);
    dataToSendToServer.append("displayedName", formData.displayedName);
    dataToSendToServer.append("email", formData.email);
    dataToSendToServer.append(
      "twitterUsername",
      formData.socialMedia.twitter.username
    );
    dataToSendToServer.append("twitterLink", formData.socialMedia.twitter.link);
    dataToSendToServer.append(
      "instagramUsername",
      formData.socialMedia.instagram.username
    );
    dataToSendToServer.append(
      "instagramLink",
      formData.socialMedia.instagram.link
    );
    dataToSendToServer.append(
      "facebookUsername",
      formData.socialMedia.facebook.username
    );
    dataToSendToServer.append(
      "facebookLink",
      formData.socialMedia.facebook.link
    );
    dataToSendToServer.append(
      "linkedInUsername",
      formData.socialMedia.linkedIn.username
    );
    dataToSendToServer.append(
      "linkedInLink",
      formData.socialMedia.linkedIn.link
    );

    // dataToSendToServer.append("password", formData.password);
    try {
      const data = await putEditProfileInfo(userId, dataToSendToServer);
      if (data?.message) {
        alert(data.message);
      } else {
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to use service file to communicate with backend to update user profile. Error: ${err}`
      );
    }
  };

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
  useEffect(() => {
    console.log(photo);
  }, [photo]);
  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-[60rem] mt-40 md:mt-80">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">
          Profile Page!
        </h1>
        <form className="space-y-8 p-6 bg-gray-800 rounded-lg w-full flex items-center gap-12">
          {/* col 1 */}
          <div className="w-full md:w-1/2">
            {/* photo */}
            <div>
              <label className=" text-gray-100 mb-2 flex items-center gap-4">
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
                className="block text-gray-100 mb-2"
              >
                Upload New Photo:
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
            {/* displayedName */}
            <div className="mb-4">
              <label
                htmlFor="displayedName"
                className="block text-gray-100 mb-2"
              >
                Displayed Name:
              </label>
              <input
                type="text"
                id="displayedName"
                name="displayedName"
                value={displayedName}
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
          {/* //* col 2 */}
          <div className="w-full md:w-1/3">
            {/* Twitter */}
            <div className="mb-4">
              <label
                htmlFor="twitterUsername"
                className=" text-gray-100 mb-2 flex items-center gap-4"
              >
                <Icon type="twitter" size="sm" color="#0077B5" />
                Twitter Username:
              </label>
              <input
                type="text"
                id="twitterUsername"
                name="twitterUsername"
                value={socialMedia.twitter?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="twitterLink"
                className=" text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="twitter" size="sm" color="#0077B5" />
                Twitter Link:
              </label>
              <input
                type="text"
                id="twitterLink"
                name="twitterLink"
                value={socialMedia.twitter?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>

            {/* Instagram */}
            <div className="mb-4">
              <label
                htmlFor="instagramUsername"
                className=" text-gray-100 mb-2 flex items-center gap-4"
              >
                <Icon type="instagram" size="sm" color="#E1306C" />
                Instagram Username:
              </label>
              <input
                type="text"
                id="instagramUsername"
                name="instagramUsername"
                value={socialMedia.instagram?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="instagramLink"
                className=" text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="instagram" size="sm" color="#E1306C" />
                Instagram Link:
              </label>
              <input
                type="text"
                id="instagramLink"
                name="instagramLink"
                value={socialMedia.instagram?.link}
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
                className=" text-gray-100 mb-2 flex items-center gap-4"
              >
                <Icon type="facebook" size="sm" color="#3b5998" />
                Facebook Username:
              </label>
              <input
                type="text"
                id="facebookUsername"
                name="facebookUsername"
                value={socialMedia.facebook?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="facebookLink"
                className=" text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="facebook" size="sm" color="#3b5998" />
                Facebook Link:
              </label>
              <input
                type="text"
                id="facebookLink"
                name="facebookLink"
                value={socialMedia.facebook?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>

            {/* linkedIn */}
            <div className="mb-4">
              <label
                htmlFor="linkedInUsername"
                className=" text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="linkedin" size="sm" color="#0077B5" />
                linkedIn Username:
              </label>
              <input
                type="text"
                id="linkedInUsername"
                name="linkedInUsername"
                value={socialMedia.linkedIn?.username}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
              <label
                htmlFor="linkedInLink"
                className=" text-gray-100 mb-2 flex items-center gap-4 my-5"
              >
                <Icon type="linkedin" size="sm" color="#0077B5" />
                linkedIn Username:
              </label>
              <input
                type="text"
                id="linkedInLink"
                name="linkedInLink"
                value={socialMedia.linkedIn?.link}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              />
            </div>
          </div>
        </form>{" "}
        {/* confirm changes */}
        <div className="flex justify-center items-center gap-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
          >
            Confirm Changes
          </button>
        </div>
      </div>
    </main>
  );
}

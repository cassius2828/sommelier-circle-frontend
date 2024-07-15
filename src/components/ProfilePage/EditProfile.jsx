import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileService } from "../../services/profileService";

export default function EditProfile() {
  const { userId } = useParams();
  const [photo, setPhoto] = useState("");

  useEffect(() => {


    async function getProfile() {
      try {
        const userProfile = await getProfileService(userId);
  
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [userId]);

  function handleFileInput(e) {
    console.log(e.target.files);
    setPhoto(e.target.files[0]);
  }

  return (
    <main className="bg-theme-dn min-h-screen flex flex-col items-center justify-center">
      <div className="bg-theme-sand p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl text-gray-100 mb-4 text-center">Profile Page!</h1>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="upload-photo" className="block text-gray-100 mb-2">Upload Photo:</label>
            <input
              type="file"
              id="upload-photo"
              onChange={handleFileInput}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-theme-sand"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-theme-dn text-theme-sand px-4 py-2 rounded-md focus:outline-none hover:bg-gray-800 transition-colors duration-200"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

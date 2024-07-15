import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDoc } from "../../services/profileService";
import SearchBar from "../CommonComponents/SearchBar";
import FavoritesList from "./FavoritesList";
import UserInfo from "./UserInfo";
import UserSearchBar from "./UserSearchBar";
import useAuthContext from "../../context/auth/useAuthContext";

export default function ProfilePage() {
  const [photo, setPhoto] = useState("");
  const { user } = useAuthContext();
  const { userId } = useParams();

  console.log(user._id, " <-- user");
  console.log(userId, " <-- user ID");
  const isSignedInUsersProfile = user._id === userId;

  function handleFileInput(e) {
    console.log(e.target.files);
    setPhoto(e.target.files[0]);
  }

  return (
    <div className="flex flex-col justify-around gap-4 mt-80 mb-48 w-full ">
      {/* user info */}
      <UserInfo isSignedInUsersProfile={isSignedInUsersProfile} />{" "}
      <div className="flex justify-center">
        {/* favorites */}
        <FavoritesList />
        {/* search */}
        {isSignedInUsersProfile && <UserSearchBar />}
      </div>
      {/* featured blog */}
    </div>
  );
}

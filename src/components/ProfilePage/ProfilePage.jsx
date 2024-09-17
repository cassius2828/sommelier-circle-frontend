import { useParams } from "react-router-dom";
// context
import useAuthContext from "../../context/auth/useAuthContext";
// components
import FavoritesList from "./FavoritesList";
import UserInfo from "./UserInfo";
import UserSearchBar from "./UserSearchBar";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { userId } = useParams();

  const isSignedInUsersProfile = user._id === userId;

  return (
    <div className="flex flex-col justify-around gap-4 pt-12 mt-52 md:mt-80  mb-48 w-full ">
      {/* user info */}
      <UserInfo isSignedInUsersProfile={isSignedInUsersProfile} />{" "}
      <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-0">
        {/* favorites */}
        <FavoritesList />
        {/* search */}
        {isSignedInUsersProfile && <UserSearchBar />}
      </div>
      {/* featured blog */}
    </div>
  );
}

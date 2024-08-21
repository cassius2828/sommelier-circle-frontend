/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuthContext from "../../context/auth/useAuthContext";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../services/authService";
import {
  checkIfFollowing,
  getUserDoc,
  postFollowUser,
  postUnfollowUser,
} from "../../services/profileService";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";

const UserInfo = ({ isSignedInUsersProfile, userProfile }) => {
  const [userFromParams, setUserFromParams] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoading, setIsLoading, scrollToTop } = useGlobalContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthContext();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserFromParams = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserDoc(userId);
        setUserFromParams(userData);

        const currentUserData = await getUserDoc(user._id);
        setCurrentUser(currentUserData);
      } catch (err) {
        console.error(err);
        console.log(
          `Error trying to fetch the user info from db for user id in params`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFromParams();
    scrollToTop();
  }, [userId, user._id, isFollowing]);

  // checks if current user is following displayed user or not
  // useEffect with user dependencies to ensure it runs each time these users change so
  // state is fresh
  useEffect(() => {
    const fetchIfFollowing = async () => {
      if (currentUser && userFromParams) {
        const followBoolean = await checkIfFollowing(
          currentUser,
          userFromParams._id
        );
        setIsFollowing(followBoolean);
      }
    };

    fetchIfFollowing();
  }, [currentUser, userFromParams]);

  // handle follow
  const handleFollow = async () => {
    try {
      await postFollowUser(user._id, userFromParams._id);
      setIsFollowing(true);
    } catch (err) {
      console.error(err);
      console.log(`Unable to follow user | UserInfo.jsx`);
    }
  };
  // handle unfollow
  const handleUnfollow = async () => {
    try {
      await postUnfollowUser(user._id, userFromParams._id);
      setIsFollowing(false);
    } catch (err) {
      console.error(err);
      console.log(`Unable to unfollow user | UserInfo.jsx`);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-2 grid-rows-2 mb-24 pb-12 border-b w-3/4 mx-auto">
      {/* user img and name */}
      <div className="col-start-1 col-span-2 row-span-2 row-start-1 mx-auto my-12">
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={userFromParams?.profileImg}
          alt=""
        />
        <h3 className="text-center mt-5 text-4xl text-gray-100">
          {userFromParams?.username}
        </h3>
      </div>
      {/* user info */}
      <div className="col-span-1 col-start-1 row-span-1 row-start-2 ml-auto mr-24 text-gray-100">
        <h4 className="text-3xl capitalize">user info</h4>
        <ul>
          {isSignedInUsersProfile && (
            <li className="text-xl my-4">email: {userFromParams?.email}</li>
          )}
          <li className="text-xl my-4">
            following: {userFromParams?.following?.length}
          </li>
          <li className="text-xl my-4">
            followers: {userFromParams?.followers?.length}
          </li>
          <li className="text-xl my-4">social media</li>
          {isSignedInUsersProfile && (
            <li className="text-xl my-4 hover:text-theme-sand transition-colors duration-200 ease-in-out cursor-pointer">
              sign out
            </li>
          )}
        </ul>
      </div>
      {/* edit profile */}

      <div className="col-span-1 col-start-2 row-span-1 row-start-2 mx-auto">
        {isSignedInUsersProfile ? (
          <Link to={`/profiles/${userId}/edit`}>
            <button className="text-2xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200">
              edit profile
            </button>
          </Link>
        ) : isFollowing ? (
          <button
            onClick={handleUnfollow}
            className="text-2xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="text-2xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;

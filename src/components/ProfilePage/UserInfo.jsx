/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuthContext from "../../context/auth/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../services/authService";
import {
  checkIfFollowing,
  getUserDoc,
  postFollowUser,
  postUnfollowUser,
} from "../../services/profileService";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import { Icon } from "../Icons/Social-Icons";

const UserInfo = ({ isSignedInUsersProfile, userProfile }) => {
  const [userFromParams, setUserFromParams] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoading, setIsLoading, scrollToTop } = useGlobalContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser, handleLogout } = useAuthContext();
  const { userId } = useParams();
  const navigate = useNavigate("/");

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
    <div className="grid grid-cols-2 grid-rows-2 mb-24 pb-12 border-b w-3/4  mx-auto">
      {/* user img and name */}
      <div className="col-start-1 col-span-2 row-span-2 row-start-1 mx-auto my-12 ">
        <img
          className="w-48 h-48 object-cover rounded-full"
          src={userFromParams?.profileImg}
          alt={userFromParams?.username + " avatar"}
        />
        <h3 className="text-center mt-5 text-5xl text-gray-100 ">
          {userFromParams?.displayedName}
        </h3>
      </div>
      {/* user info */}
      <div className=" w-full  col-span-1 col-start-1 row-span-1 row-start-2 ml-auto mr-24 text-gray-100">
        <h4 className="text-3xl capitalize text-center">user info</h4>
        <div className="flex justify-center items-start gap-40 mt-12">
          <ul>
            {isSignedInUsersProfile && (
              <li className="text-2xl my-4 ">Email: {userFromParams?.email}</li>
            )}
            <li className="text-2xl my-4 ">
              Username: {userFromParams?.username}
            </li>
            <li className="text-2xl my-4 ">
              Display Name: {userFromParams?.displayedName}
            </li>
          </ul>
          <ul>
            <li className="text-2xl my-4 ">
              Following: {userFromParams?.following?.length}
            </li>
            <li className="text-2xl my-4 ">
              Followers: {userFromParams?.followers?.length}
            </li>
            {/* social media */}
            <li className="text-2xl my-4 ">
              <h4 className="capitalize text-2xl">social media</h4>
              <ul className="relative right-10 mt-3 text-xl">
                {/* twitter */}
                <Link to={userFromParams?.socialMedia.twitter.link}>
                  <li className="flex items-center gap-3">
                    {" "}
                    <Icon type="twitter" size="md" color="#1DA1F2" />
                    {userFromParams?.socialMedia.twitter.username
                      ? "@" + userFromParams?.socialMedia.twitter.username
                      : "---"}
                  </li>
                </Link>
                {/* instagram */}
                <Link to={userFromParams?.socialMedia.instagram.link}>
                  <li className="flex items-center gap-3">
                    {" "}
                    <Icon type="instagram" size="md" color="#E1306C" />
                    {userFromParams?.socialMedia.instagram.username
                      ? "@" + userFromParams?.socialMedia.instagram.username
                      : "---"}
                  </li>{" "}
                </Link>
                {/* facebook */}
                <Link to={userFromParams?.socialMedia.facebook.link}>
                  <li className="flex items-center gap-3">
                    {" "}
                    <Icon type="facebook" size="md" color="#3b5998" />
                    {userFromParams?.socialMedia.facebook.username
                      ? userFromParams?.socialMedia.facebook.username
                      : "---"}
                  </li>{" "}
                </Link>
                {/* linked in */}
                <Link to={userFromParams?.socialMedia.linkedIn.link}>
                  <li className="flex items-center gap-3">
                    {" "}
                    <Icon type="linkedin" size="md" color="#0077B5" />
                    {userFromParams?.socialMedia.linkedIn.username
                      ? userFromParams?.socialMedia.linkedIn.username
                      : "---"}
                  </li>
                </Link>
              </ul>
            </li>
          </ul>{" "}
        </div>
      </div>
      {/* edit profile */}

      <div className="col-span-1 col-start-2 row-span-1 row-start-2 mx-auto">
        {isSignedInUsersProfile ? (
          <div className="flex flex-col items-center gap-8">
            <Link to={`/profiles/${userId}/edit`}>
              <button className="text-2xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200 w-40 capitalize">
                edit profile
              </button>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
              className="text-2xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200 w-40"
            >
              Sign Out
            </button>
          </div>
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

import React from "react";
import {
  UilFacebookF,
  UilTwitter,
  //   UilPinterest,
  UilInstagram,
  UilLinkedin,
} from "@iconscout/react-unicons";
import { getCheckUserSocialMediaStatus } from "../../services/profileService";
import useAuthContext from "../../context/auth/useAuthContext";

export const Icon = ({ type, size = "md", color }) => {
  const { user } = useAuthContext();
  const handleClick = async () => {
    // find a way to check if the signed in user has a username and link for their social media
    // backend funciton, it will return a message, message will be our conditional on how to proceed
    const data = await getCheckUserSocialMediaStatus(user._id, type);
    if (data.message) {
      // * success = open link with url to social media platform
      
    } else if (data.error) {
      // ! failure = show modal that will prompt user to upload their social media info in profile
    }
  };
  const icons = {
    facebook: UilFacebookF,
    twitter: UilTwitter,
    // pinterest: UilPinterest,
    // reddit: UilRedditAlien,
    instagram: UilInstagram,
    linkedin: UilLinkedin,
  };

  const sizes = {
    sm: 16,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 80,
  };

  const SelectedIcon = icons[type];

  return <SelectedIcon size={sizes[size]} color={color} />;
};

const SocialIcons = () => {
  return (
    <div className="social-icons flex items-center justify-around w-1/2 mx-auto mt-24 mb-12">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="facebook" size="md" color="#3b5998" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <Icon type="twitter" size="md" color="#1DA1F2" />
      </a>

      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="instagram" size="md" color="#E1306C" />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="linkedin" size="md" color="#0077B5" />
      </a>
    </div>
  );
};

export default SocialIcons;

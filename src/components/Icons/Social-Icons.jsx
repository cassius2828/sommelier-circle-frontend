import React from "react";
import { ShareSocial } from "react-share-social";
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
const style = {
  root: {
    background: "transparent",
    borderRadius: 3,
    border: 0,
    boxShadow: "0 3px 5px 2px #000",
    color: "white",
    width: "100%",
    margin: "8rem auto 3rem auto",
  },
  copyContainer: {
    border: "1px solid #676969",
    background: "rgb(0,0,0,0.7)",
  },
  title: {
    color: "aquamarine",
    fontStyle: "italic",
  },
};
const SocialIcons = () => {
  const url = encodeURI(window.location.href);
  const blogUser = "Test User";
  const userIGProfile = 'cashm0neyy__'
  const text = encodeURIComponent(
    `Check out this blog from ${blogUser} on Sommelier Circle\n`
  );

  return (
    // <>
    //   <ShareSocial
    //     style={style}
    //     socialTypes={["facebook", "twitter", "linkedin", "reddit"]}
    //     url={url}

    //   />
    // </>
    <div className="social-icons flex items-center justify-around w-1/2 mx-auto mt-24 mb-12">
      {/* Facebook Share URL */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="facebook" size="md" color="#3b5998" />
      </a>

      {/* Twitter Share URL */}
      <a
        href={`https://twitter.com/intent/tweet?text=${text + " " + url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="twitter" size="md" color="#1DA1F2" />
      </a>

      {/* Instagram (Link to a Profile) */}
      <a
        href={`https://www.instagram.com/${userIGProfile}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="instagram" size="md" color="#E1306C" />
      </a>

      {/* LinkedIn Share URL */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="linkedin" size="md" color="#0077B5" />
      </a>
    </div>
  );
};

export default SocialIcons;

import {
  UilFacebookF,
  UilTwitter,
  UilInstagram,
  UilLinkedin,
} from "@iconscout/react-unicons";

import useAuthContext from "../../context/auth/useAuthContext";

export const Icon = ({ type, size = "md", color }) => {
  const icons = {
    facebook: UilFacebookF,
    twitter: UilTwitter,
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

const SocialIcons = ({ blogAuthor, title, width, mediaType, wineName }) => {
  const { user } = useAuthContext();

  const url = encodeURI(window.location.href);

  const userIGProfile = user.socialMedia.instagram.username || "";
  let text = "";
  if (mediaType === "blogs") {
    text = encodeURIComponent(
      `Check out this blog${
        blogAuthor === "SC_Admin" ? "" : ` from ${blogAuthor}`
      } about ${
        title ? '"' + title + '"' : "a wine experience"
      } from Sommelier Circle\n`
    );
  } else if (mediaType === "wineId") {
    text = encodeURIComponent(
      `Check out the wine "${wineName}" from Sommelier Circle\n`
    );
  }

  return (
    <div
      className={`social-icons flex items-center justify-around ${
        width === "full" ? "w-full" : "w-1/2 mx-auto"
      } `}
    >
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

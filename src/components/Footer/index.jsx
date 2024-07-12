import React from "react";
import {
  UilFacebookF,
  UilGithub,
  UilInstagram,
  UilTwitter,
//   UilTwitch,
} from "@iconscout/react-unicons";
import SocialIcons from "../Icons/Social-Icons";

const sections = [
  {
    title: "Wines",
    items: ["Featured", "Categories", "Search", "Favorites", "Explore"],
  },
  {
    title: "Rooms",
    items: ["Featured", "Search", "Favorites", "Explore"],
  },
  {
    title: "Community",
    items: ["Blogs", "Search Users", "News", "Locations", "Support"],
  },
];

const items = [
  { name: "Facebook", icon: UilFacebookF, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: UilInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: UilTwitter, link: "https://twitter.com/" },
//   { name: "Twitch", icon: UilTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: UilGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div className="w-full mt-24 bg-black text-gray-300 py-y px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2 text-xl">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-gray-500 text-lg hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          
          </div>
        ))}
  <div className="flex flex-col items-center w-full ">
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 64 64"
  width="64px"
  height="64px"
  fill="#000000"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M32,64c-0.552,0-1-0.448-1-1V49c-4.384-0.258-8.386-1.868-11.394-4.537c-4.795-4.278-7.47-10.564-7.52-17.25 c-0.001-0.23-0.001-0.465-0.001-0.701c0-0.01,0-0.021,0-0.031V3.887c0-0.167,0.021-0.334,0.064-0.497l1.794-6.732 C14.061,0.265,14.514-0.011,15.004,0.007c0.489,0.019,0.922,0.316,1.103,0.774L23.402,16H40.6l7.295-15.22 c0.181-0.379,0.556-0.636,0.974-0.776c0.418-0.138,0.88-0.085,1.262,0.144c0.303,0.182,0.537,0.466,0.662,0.808l1.838,5.043 c0.08,0.218,0.122,0.448,0.122,0.681v22.388c0,0.01,0,0.021,0,0.031c0,0.236,0,0.471-0.001,0.701 c-0.05,6.686-2.725,12.972-7.52,17.25C41.386,47.132,37.384,48.742,33,49v14C33,63.552,32.552,64,32,64z M21.09,45.098 C23.731,47.395,27.248,48.759,31,48.994c0.331,0.021,0.663,0.021,0.994,0c3.752-0.235,7.269-1.599,9.91-3.896 c4.322-3.858,6.752-9.492,6.8-15.384c0.001-0.23,0.001-0.459,0.001-0.688V4.682l-1.325-3.633L39.399,17H24.6L17.531,1.649 L16,7.388V29.11c0,0.229,0,0.459,0.001,0.688C16.339,35.606,18.769,41.24,21.09,45.098z M32,33c-5.523,0-10-4.477-10-10V18 c0-0.552,0.448-1,1-1h18c0.552,0,1,0.448,1,1v5C42,28.523,37.523,33,32,33z M24,19v4c0,4.411,3.589,8,8,8s8-3.589,8-8v-4H24z"
      fill="#231f20"
    ></path>{" "}
  </g>
</svg>
<SocialIcons/>
        </div>
     
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">Developed by Cassius Reynolds</p>

      </div>
    </div>
  );
};

export default Footer;

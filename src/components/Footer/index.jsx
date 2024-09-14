import React from "react";
import {
  UilFacebookF,
  UilGithub,
  UilInstagram,
  UilTwitter,
  //   UilTwitch,
} from "@iconscout/react-unicons";
import SocialIcons from "../Icons/Social-Icons";
import { Link } from "react-router-dom";

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
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 border-b-2 border-gray-600 md:py-8 p-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2 text-xl">
              {section.title}
            </h6>
            <ul className="p-2 md:p-0">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="py-1 text-gray-500 text-lg hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col items-center w-full ">
          <img className="w-48" src="/images/logo.svg" alt="logo" />
        </div>
      </div>

      <div className="flex  max-w-[1240px] px-2 py-4 mx-auto items-center gap-8 justify-center md:justify-start sm:flex-row text-center text-gray-500">
        <p className="py-4">Developed by Cassius Reynolds</p>
        <Link
          className="text-[#e4dccc] hover:text-[#747464] transition-colors duration-200"
          to={`https://github.com/cassius2828`}
        >
          <UilGithub size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;

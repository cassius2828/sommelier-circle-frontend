import { Link } from "react-router-dom";
import { UilGithub } from "@iconscout/react-unicons";
import useAuthContext from "../../context/auth/useAuthContext";

const Footer = () => {
  const { user } = useAuthContext();
  const sections = [
    {
      category: "Wines",
      items: [
        { title: "Styles", path: "/wines/styles" },
        { title: "Regions", path: "/wines/regions" },
        { title: "Grapes", path: "/wines/grapes" },
        { title: "Search", path: "/wines/search" },
        { title: "Favorites", path: `/favorites/wines/${user._id}` },
      ],
    },
    {
      category: "Locations",
      items: [
        { title: "Explore", path: "/locations/explore" },
        { title: "Favorites", path: `/favorites/locations/${user._id}` },
      ],
    },
    {
      category: "Events",
      items: [
        { title: "Explore", path: "/events" },
        { title: "Favorites", path: `/favorites/events/${user._id}` },
      ],
    },
    {
      category: "Community",
      items: [
        { title: "Blogs", path: "/blogs/explore" },
        { title: "Favorites", path: `/favorites/blogs/${user._id}` },
      ],
    },
  ];
  return (
    <div className="w-full mt-24 bg-black text-gray-300 py-y px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 border-b-2 border-gray-600 md:py-8 p-8">
        {/* footer sections */}
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2 text-xl">
              {section.category}
            </h6>
            <ul className="p-2 md:p-0">
              {section.items.map((item, i) => (
                <Link key={item.title + i} to={item.path}>
                  <li className="py-1 text-gray-500 text-lg hover:text-white">
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col items-center w-full ">
          <img className="w-48" src="/images/logo.svg" alt="logo" />
        </div>
      </div>

      <div className="flex  max-w-[1240px] px-2 py-4 mx-auto items-center gap-8 justify-center md:justify-start sm:flex-row text-center text-gray-500">
        {/* github link */}
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

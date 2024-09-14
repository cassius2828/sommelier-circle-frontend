import { useState } from "react";
import Hamburger from "../Hamburger";
import { NavLink } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuthContext();

  return (
    <nav className="bg-theme-darkest block md:hidden">
      {/* hamburgher */}
      <div className="absolute top-16 right-3">
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <ul
        className={` bg-theme-darkest w-full text-gray-100 text-xl text-center flex flex-col justify-start gap-8 p-5  absolute z-20 staggered-list-vert  transition-all duration-500 ${
          isOpen ? "-translate-y-0" : "-translate-y-[30rem]"
        }`}
      >
        <li>
          <NavLink
            to="/"
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Home
          </NavLink>
        </li>

        <li onClick={() => setIsOpen(false)}>
          <NavLink
            to="/locations/explore"
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Locations
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <NavLink
            to="/events"
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Events
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <NavLink
            to="/wines/search"
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Wines
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <NavLink
            to="/blogs/explore"
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Blogs
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <NavLink
            to="/critics"
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Critics
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <NavLink
            to={`/profiles/${user?._id}`}
            className="hover:text-theme-sand transition-colors duration-200"
          >
            Profile
          </NavLink>
        </li>
        <li
          className="hover:text-theme-sand transition-colors duration-200"
          onClick={() => {
            setIsOpen(false);
            handleLogout();
          }}
        >
          Sign Out
        </li>
      </ul>
    </nav>
  );
};
export default NavBarMobile;

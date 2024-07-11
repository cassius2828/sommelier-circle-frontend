/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAuthContext from "../../context/blog/auth/useAuthContext";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { pinNavToTop } from "../../gsap/gsapFunctions";
import Hamburger from "../Hamburger";

const NavBar = () => {
  const { user, handleLogout } = useAuthContext();
  return (
    <>
      <NavBarDesktop user={user} handleLogout={handleLogout} />
    </>
  );
};
export default NavBar;

export const NavBarDesktop = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
  useGSAP(
    () => {
      if (container.current) {
        pinNavToTop("#desktop-nav");
      }
    },
    { scope: container }
  );
  return (
    <>
      {user ? (
        // w-40
        <div ref={container}>
          <nav
            id="desktop-nav"
            className={`bg-theme-sand-dark text-gray-100 p-4 absolute z-10 h-screen ${
              isOpen ? "w-80i" : "w-40i"
            } transition-all duration-200 ease-in-out `}
          >
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
            <ul
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col space-x-4 items-center justify-around h-1/2 text-2xl staggered-list`}
            >
              <li>
                <Link
                  to="/"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/${user._id}`}
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={`/blogs/new`}
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Create a Blog
                </Link>
              </li>{" "}
              <li>
                <Link
                  to={`/blogs/user-blogs/${user._id}`}
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  My Blogs
                </Link>
              </li>              <li>
                <Link
                  to={`/blogs/explore`}
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Explore Blogs
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLogout()}
                  to=""
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div ref={container}>
          <nav
            id="desktop-nav"
            className={`bg-theme-sand-dark text-gray-100 p-4 absolute z-10 h-screen ${
              isOpen ? "w-80i" : "w-40i"
            } transition-all duration-200 ease-in-out `}
          >
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
            <ul
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col space-x-4 items-center justify-around h-1/2 text-2xl staggered-list`}
            >
              <li>
                <Link
                  to="auth/signin"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="auth/signup"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export const NavBarMobile = () => {
  return <div>NavBarMobile</div>;
};

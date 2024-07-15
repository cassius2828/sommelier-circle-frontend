/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { pinNavToTop } from "../../gsap/gsapFunctions";
import Hamburger from "../Hamburger";
import { NavListItem } from "./NavListItem";

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
  const location = useLocation();
  const isRoot = location.pathname === "/";

  // this solves issue of not being able to ensure nav is pinned when a user navigates but does not rerender the app
  useGSAP(() => {
    pinNavToTop("#desktop-nav-landing");
  }, [location.pathname]);

  if (!isRoot) return;
  return (
    <>
      {user ? (
        <div ref={container}>
          <nav
            id="desktop-nav-landing"
            className={`bg-theme-sand-dark text-gray-100 p-4 absolute z-10 top-52 h-screen ${
              isOpen ? "w-80i" : "w-40i"
            } transition-all duration-200 ease-in-out `}
          >
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
            <ul
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col space-x-4 items-center justify-around h-3/4 text-2xl staggered-list`}
            >
              <li
                onClick={() => {
                  setIsOpen(false);
                  // window.location.reload();
                }}
              >
                <Link
                  to="/"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/rooms"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Rooms
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/events"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/wines/search"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Wines
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/blogs/explore"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Blogs
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/critics"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Critics
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to={`/profiles/${user._id}`}
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Profile
                </Link>
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
              } flex-col space-x-4 items-center justify-around mt-20 gap-12 text-2xl staggered-list`}
            >
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/auth/signin"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Sign in
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/auth/signup"
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

export const NavBarTop = ({ handleLogout }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const isRoot = location.pathname === "/";
  if (isRoot) return;
  return (
    <>
      {user ? (
        <nav
          id="desktop-nav"
          className={` text-gray-100 p-4  transition-all duration-200 ease-in-out absolute -bottom-8 w-full`}
        >
          <ul
            className={`flex
             space-x-2 items-center justify-evenly  text-xl w-screen  staggered-list`}
          >
            <li
              onClick={() => {
                window.location.reload();
              }}
            >
              <Link
                to="/"
                className="
              
                pb-1
            
              "
              >
                Home
              </Link>
            </li>
            <NavListItem
              listItemText={`Rooms`}
              dropDownItems={[
                {
                  text: "explore rooms",
                  path: "/rooms/explore",
                },
                {
                  text: "favorite rooms",
                  path: "/favorites/rooms",
                },
                {
                  text: "search rooms",
                  path: "/rooms",
                },
              ]}
            />
            <NavListItem
              listItemText={`Events`}
              dropDownItems={[
                {
                  text: "explore events",
                  path: "/events/explore",
                },
                {
                  text: "favorite events",
                  path: "/favorites/events",
                },
                {
                  text: "search events",
                  path: "/events",
                },
              ]}
            />
            <NavListItem
              listItemText={`Wines`}
              dropDownItems={[
                {
                  text: "wine styles",
                  path: "/wines/styles",
                },
                {
                  text: "wine regions",
                  path: "/wines/regions",
                },
                {
                  text: "grapes",
                  path: "/wines/grapes",
                },
                {
                  text: "favorite wines",
                  path: "/favorites/wines",
                },
                {
                  text: "search wines",
                  path: "/wines/search",
                },
              ]}
            />
            {/* <li>
              <Link
                to={`/${user._id}`}
                className="
              
                pb-1
            
              "
              >
                Profile
              </Link>
            </li> */}
            {/* <li>
              <Link
                to={`/blogs/new`}
                className="
              
                pb-1
            
              "
              >
                Create a Blog
              </Link>
            </li> */}
            {/* <li>
              <Link
                to={`/blogs/user-blogs/${user._id}`}
                className="
              
                pb-1
            
              "
              >
                My Blogs
              </Link>
            </li> */}
            {/* <li>
              <Link
                to={`/blogs/explore`}
                className="
              
                pb-1
            
              "
              >
                Explore Blogs
              </Link>
            </li> */}
            <NavListItem
              listItemText={`Blogs`}
              dropDownItems={[
                {
                  text: "community blogs",
                  path: "/blogs/explore",
                },
                {
                  text: "create a blog",
                  path: "/blogs/new",
                },
                {
                  text: "my blogs",
                  path: `/blogs/user-blogs/${user._id}`,
                },
                {
                  text: "favorite blogs",
                  path: "/favorites/blogs",
                },
                // {
                //   text: "search blogs",
                //   path: "/blogs",
                // },
              ]}
            />
            <NavListItem
              listItemText={`Critics`}
              dropDownItems={[
                {
                  text: "explore critics",
                  path: "/critics/explore",
                },

                {
                  text: "favorite critics",
                  path: "/favorites/critics",
                },
              ]}
            />
            <NavListItem
              listItemText={`Profile`}
              dropDownItems={[
                {
                  text: "view profile",
                  path: `/profiles/${user._id}`,
                },
                {
                  text: "sign out",
                  path: `/`,
                  onClick: handleLogout
                },
              ]}
            />
          </ul>
        </nav>
      ) : (
        <nav
          id="desktop-nav"
          className={`text-gray-100 p-4 transition-all duration-200 ease-in-out `}
        >
          <ul
            className={`flex space-x-4 items-center justify-around h-1/2 text-2xl absolute top-1/2 right-12 -translate-y-1/2 staggered-list`}
          >
            <li>
              <Link
                to="/auth/signin"
                className="
              
                pb-1
            
              "
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                to="/auth/signup"
                className="
              
                pb-1
            
              "
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

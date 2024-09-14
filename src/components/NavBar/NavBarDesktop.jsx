import { Link, useLocation } from "react-router-dom";
import Hamburger from "../Hamburger";
import { pinNavToTop } from "../../gsap/gsapFunctions";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import useAuthContext from "../../context/auth/useAuthContext";

export const NavBarDesktop = () => {
  const { user, handleLogout } = useAuthContext();

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
            } transition-all duration-200 ease-in-out hidden md:block`}
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
                  to="/locations/explore"
                  className="hover:text-theme-sand transition-colors duration-200"
                >
                  Locations
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

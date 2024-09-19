import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// gsap
import { useGSAP } from "@gsap/react";
import { pinNavToTop } from "../../gsap/gsapFunctions";
// components
import Hamburger from "../Hamburger";
import useAuthContext from "../../context/auth/useAuthContext";

export const NavBarDesktop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuthContext();
  const container = useRef(null);
  const location = useLocation();
  const isRoot = location.pathname === "/";
const navigate = useNavigate()
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
            className={`bg-theme-sand-dark text-gray-100 p-4 absolute z-20 top-52 h-screen ${
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
                }}
              >
                <Link
                  to="/"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/locations/explore"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Locations
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/events"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/wines/search"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Wines
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/blogs/explore"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Blogs
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/critics"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Critics
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to={`/profiles/${user._id}`}
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Profile
                </Link>
              </li>
              <li
                className="hover:text-slate-900 transition-colors duration-300"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                navigate("/");

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
            id="desktop-nav-landing"
            className={`bg-theme-sand-dark text-gray-100 p-4 absolute z-20 top-52 h-screen ${
              isOpen ? "w-80i" : "w-40i"
            } transition-all duration-200 ease-in-out hidden md:block`}
          >
            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
            <ul
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col space-x-4 items-center justify-around mt-20 gap-12 text-2xl staggered-list`}
            >
          
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/locations/explore"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Locations
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/events"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/wines/search"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Wines
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/blogs/explore"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Blogs
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/critics"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Critics
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/auth/signin"
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  Sign in
                </Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link
                  to="/auth/signup"
                  className="hover:text-slate-900 transition-colors duration-300"
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

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// context
import useAuthContext from "../../context/auth/useAuthContext";
// components
import Hamburger from "../Hamburger";
import { NavListItem } from "./NavListItem";

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuthContext();
const handleClick = () => {
  setIsOpen(false)
}
  return (
    <nav className="bg-theme-darkest block md:hidden">
      {/* hamburgher */}
      <div className="absolute top-16 right-3">
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {user ? (
        <ul
          className={` bg-theme-darkest w-full text-gray-100 text-xl text-center flex flex-col justify-start gap-8 p-5  absolute z-20 staggered-list-vert  transition-all duration-500 ${
            isOpen ? "-translate-y-0" : "-translate-y-[30rem]"
          }`}
        >
           {/* locations */}
           <NavListItem
           handleClick={handleClick}
              listItemText={`Locations`}
              dropDownItems={[
                {
                  text: "explore locations",
                  path: "/locations/explore",
                },
                {
                  text: "favorite locations",
                  path: `/favorites/locations/${user?._id}`,
                },
              ]}
            />
            {/* events */}
            <NavListItem
           handleClick={handleClick}
              listItemText={`Events`}
              dropDownItems={[
                {
                  text: "explore events",
                  path: "/events",
                },
                {
                  text: "my events",
                  path: "/events/my-events",
                },
                {
                  text: "post an event",
                  path: "/events/create",
                },
                {
                  text: "favorite events",
                  path: `/favorites/events/${user?._id}`,
                },
              ]}
            />
            {/* wines */}
            <NavListItem
           handleClick={handleClick}
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
                  path: `/favorites/wines/${user?._id}`,
                },
                {
                  text: "search wines",
                  path: "/wines/search",
                },
              ]}
            />
{/* blogs */}
            <NavListItem
           handleClick={handleClick}
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
                  path: `/blogs/user-blogs/${user?._id}`,
                },
                {
                  text: "favorite blogs",
                  path: `/favorites/blogs/${user?._id}`,
                },
                // {
                //   text: "search blogs",
                //   path: "/blogs",
                // },
              ]}
            />
            {/* critics */}
            <NavListItem
           handleClick={handleClick}
              listItemText={`Critics`}
              dropDownItems={[
                {
                  text: "explore critics",
                  path: "/critics",
                },

                {
                  text: "favorite critics",
                  path: `/favorites/critics/${user?._id}`,
                },
              ]}
            />
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
      ) : (
        <ul
          className={` bg-theme-darkest w-full text-gray-100 text-xl text-center flex flex-col justify-start gap-8 p-5  absolute z-20 staggered-list-vert  transition-all duration-500 ${
            isOpen ? "-translate-y-0" : "-translate-y-[30rem]"
          }`}
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
            {/* locations */}
            <NavListItem
           handleClick={handleClick}
              listItemText={`Locations`}
              dropDownItems={[
                {
                  text: "explore locations",
                  path: "/locations/explore",
                },
                {
                  text: "favorite locations",
                  path: `/favorites/locations/${user?._id}`,
                },
              ]}
            />
            {/* events */}
            <NavListItem
           handleClick={handleClick}
              listItemText={`Events`}
              dropDownItems={[
                {
                  text: "explore events",
                  path: "/events",
                },
                {
                  text: "my events",
                  path: "/events/my-events",
                },
                {
                  text: "post an event",
                  path: "/events/create",
                },
                {
                  text: "favorite events",
                  path: `/favorites/events/${user?._id}`,
                },
              ]}
            />
            {/* wines */}
            <NavListItem
           handleClick={handleClick}
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
                  path: `/favorites/wines/${user?._id}`,
                },
                {
                  text: "search wines",
                  path: "/wines/search",
                },
              ]}
            />
{/* blogs */}
            <NavListItem
           handleClick={handleClick}
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
                  path: `/blogs/user-blogs/${user?._id}`,
                },
                {
                  text: "favorite blogs",
                  path: `/favorites/blogs/${user?._id}`,
                },
                // {
                //   text: "search blogs",
                //   path: "/blogs",
                // },
              ]}
            />
            {/* critics */}
            <NavListItem
           handleClick={handleClick}
              listItemText={`Critics`}
              dropDownItems={[
                {
                  text: "explore critics",
                  path: "/critics",
                },

                {
                  text: "favorite critics",
                  path: `/favorites/critics/${user?._id}`,
                },
              ]}
            />
            {/* login */}
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
            {/* register */}
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
      )}
    </nav>
  );
};
export default NavBarMobile;

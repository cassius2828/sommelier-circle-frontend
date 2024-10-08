import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";
import { NavListItem } from "./NavListItem";

export const NavBarTop = () => {
  const { user } = useAuthContext();
  const { handleLogout } = useAuthContext();
  const location = useLocation();
  const isRoot = location.pathname === "/";

  if (isRoot) return;
  // hidden on small devices, shows on md and up devices
  return (
    <>
      {user ? (
        <nav
          id="desktop-nav"
          className={` text-gray-100 p-4  transition-all duration-200 ease-in-out absolute -bottom-8 w-full hidden md:block`}
        >
          <ul
            className={`flex
               space-x-2 items-center justify-evenly  md:text-xl w-screen  staggered-list-same `}
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
              listItemText={`Locations`}
              dropDownItems={[
                {
                  text: "explore locations",
                  path: "/locations/explore",
                },
                {
                  text: "favorite locations",
                  path: `/favorites/locations/${user._id}`,
                },
              ]}
            />
            <NavListItem
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
                  path: `/favorites/events/${user._id}`,
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
                  path: `/favorites/wines/${user._id}`,
                },
                {
                  text: "search wines",
                  path: "/wines/search",
                },
              ]}
            />

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
                  path: `/favorites/blogs/${user._id}`,
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
                  path: "/critics",
                },

                {
                  text: "favorite critics",
                  path: `/favorites/critics/${user._id}`,
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
                  onClick: handleLogout,
                },
              ]}
            />
          </ul>
        </nav>
      ) : (
        <nav
          id="desktop-nav"
          className={` text-gray-100 p-4  transition-all duration-200 ease-in-out absolute -bottom-8 w-full hidden md:block`}
        >
          <ul
            className={`flex
      space-x-2 items-center justify-evenly  md:text-xl w-screen  staggered-list-same `}
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
            <NavListItem
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
                  path: `/favorites/wines/${user?._id}`,
                },
                {
                  text: "search wines",
                  path: "/wines/search",
                },
              ]}
            />

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
            <NavListItem
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

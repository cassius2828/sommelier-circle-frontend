/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAuthContext from "../../context/blog/auth/useAuthContext";

const NavBar = () => {
  const { user, handleLogout } = useAuthContext();
  return (
    <>
      {user ? (
        <nav className="bg-theme-dn text-gray-100 p-4">
          <ul className="flex space-x-4 justify-center">
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
      ) : (
        <nav className="bg-theme-dn text-gray-100 p-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link
                to="/signin"
                className="hover:text-theme-sand transition-colors duration-200"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-theme-sand transition-colors duration-200"
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
export default NavBar;

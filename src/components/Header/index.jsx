import { NavLink, useLocation } from "react-router-dom";

import useAuthContext from "../../context/auth/useAuthContext";
import { NavBarTop } from "../NavBar/NavBarTop";

const Header = () => {
  const location = useLocation();
  const { handleLogout } = useAuthContext();
  const isRoot = location.pathname === "/";
  return (
    <header
      style={{ zIndex: "30" }}
      className={`w-full h-52 bg-theme-darkest flex flex-col justify-center items-center ${
        isRoot ? "relative" : "fixed top-0 left-0  shadow-neutral-900 shadow-md"
      } `}
    >
      <div className="flex items-center gap-5 ">
        <NavLink to="/">
          <h1 className=" text-6xl md:text-8xl text-center text-gray-100 relative -top-5">
            Sommelier Circle{" "}
          </h1>
        </NavLink>
        <img
          className="w-24 relative -top-5"
          src="/images/logo.svg"
          alt="logo"
        />
      </div>

      <NavBarTop />
    </header>
  );
};
export default Header;

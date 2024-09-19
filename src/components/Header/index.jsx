import { NavLink, useLocation } from "react-router-dom";
import { NavBarTop } from "../NavBar/NavBarTop";
import usePlacesContext from "../../context/places/usePlacesContext";

const Header = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const { deviceWidth } = usePlacesContext();
  return (
    <>
      {" "}
      {/* desktop header for using dekstop side nav */}
      <header
        style={{ zIndex: "30" }}
        className={`hidden md:flex w-full h-52 bg-theme-darkest  flex-col justify-center items-center ${
          isRoot
            ? "relative"
            : "fixed top-0 left-0  shadow-neutral-900 shadow-md"
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
      {/* mobile header to ensure header is always fixed on mobile */}
      <header
        style={{ zIndex: "30" }}
        className={`md:hidden w-full h-52 bg-theme-darkest flex flex-col justify-center items-center 
         
           fixed top-0 left-0  shadow-neutral-900 shadow-md`}
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
    </>
  );
};
export default Header;

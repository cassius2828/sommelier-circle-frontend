import { useLocation } from "react-router-dom";
import { NavBarTop } from "../NavBar/NavBar";
import useAuthContext from "../../context/auth/useAuthContext";

const Header = () => {
  const location = useLocation();
const {handleLogout} = useAuthContext()
  const isRoot = location.pathname === "/";
  return (
    <header
      className={`w-full h-52 bg-theme-darkest flex flex-col justify-center items-center ${
        isRoot ? "relative" : "fixed top-0 left-0 z-[51] shadow-neutral-900 shadow-md"
      } `}
    >
      <div className="flex items-center gap-5 ">
        <h1 className="text-8xl text-center text-gray-100 relative -top-5">
          Sommelier Circle{" "}
        </h1>
        <img
          className="w-24 relative -top-5"
          src="/images/logo.svg"
          alt="logo"
        />
      </div>

      <NavBarTop handleLogout={handleLogout} />
    </header>
  );
};
export default Header;

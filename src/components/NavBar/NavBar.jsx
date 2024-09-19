import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// components
import { NavBarDesktop } from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

const NavBar = () => {
  const location = useLocation();
  // const [showMobileNav, setShowMobileNav] = useState(false);
  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     setShowMobileNav(true);
  //   } else {
  //     setShowMobileNav(false);
  //   }
  // }, [location.pathname]);
  return (
    <>
      {/* only displays  width <= 768 */}
      { <NavBarMobile />}

      {/* displays width > 768 */}
      <NavBarDesktop />
    </>
  );
};
export default NavBar;

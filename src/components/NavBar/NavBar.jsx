/* eslint-disable react/prop-types */

import useAuthContext from "../../context/auth/useAuthContext";

import { NavBarDesktop } from "./NavBarDesktop";

const NavBar = () => {
  const { user, handleLogout } = useAuthContext();
  return (
    <>
      <NavBarDesktop user={user} handleLogout={handleLogout} />
    </>
  );
};
export default NavBar;




/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

import { getUser } from "../../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  /////////////////////
  // Handle Logout
  /////////////////////
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

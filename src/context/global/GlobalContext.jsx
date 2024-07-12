/* eslint-disable react/prop-types */
import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <GlobalContext.Provider value={{ scrollToTop }}>
      {children}
    </GlobalContext.Provider>
  );
};

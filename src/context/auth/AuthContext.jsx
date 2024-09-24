import { createContext, useState } from "react";
import { getUser } from "../../services/authService";
import { getUserDoc } from "../../services/profileService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [targetedUser, setTargetedUser] = useState({});
  const [displayTargetedUsername, setDisplayTargetedUsername] = useState(null);
  /////////////////////
  // Handle Logout
  /////////////////////
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }
  const fetchTargetUser = async (userId) => {
    try {
      const data = await getUserDoc(userId);
      setTargetedUser(data);
      setDisplayTargetedUsername(
        showTargetUserName(userId, data.displayedName, data.username)
      );
      console.log(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to get targeted user with id of ${userId}`);
    }
  };
  const showTargetUserName = (
    userId,
    targetedDisplayName,
    targetedUsername
  ) => {
    // fetchTargetUser(userId);
    const showUserName =
      userId !== user._id && (targetedDisplayName || targetedUsername) + "'s";
      console.log(showUserName, ' <--show user name function result')
    return showUserName;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        fetchTargetUser,
        targetedUser,
        displayTargetedUsername,
        showTargetUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

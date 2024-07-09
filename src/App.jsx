// src/App.jsx

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import * as authService from "./services/authService";

const App = () => {
  const [user, setUser] = useState(authService.getUser());  

  function handleLogout(){
    localStorage.removeItem('token');
    // need to remove the token from the
    setUser(null)
  }

  if (!user) {
    return (
      <>
        <NavBar user={user}/>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/signup"
            element={<SignupForm setUser={setUser} />}
          ></Route>
          <Route
            path="/signin"
            element={<SigninForm setUser={setUser} />}
          ></Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route
          path="/signup"
          element={<SignupForm setUser={setUser} />}
        ></Route>
        <Route
          path="/signin"
          element={<SigninForm setUser={setUser} />}
        ></Route>
        <Route path="/:userId" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;

// src/App.jsx
import useAuthContext  from "./context/auth/useAuthContext";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";

const App = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth/signup" element={<SignupForm />} />
          <Route path="auth/signin" element={<SigninForm />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Header />
      <NavBar />
      <AppRoutes />
    </>
  );
};

export default App;

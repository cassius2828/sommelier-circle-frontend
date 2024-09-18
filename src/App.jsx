// components
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/CommonComponents/ScrollToTop";

const App = () => {
  return (
    <>
      <Header />
      <NavBar />
      <AppRoutes />
      <ScrollToTop />
    </>
  );
};

export default App;

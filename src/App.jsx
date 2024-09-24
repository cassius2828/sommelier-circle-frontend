// components
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/CommonComponents/ScrollToTop";
import ErrorBoundary from "./components/CommonComponents/ErrorBoundary";

const App = () => {
  return (
    <>
      <Header />
      <NavBar />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <ScrollToTop />
    </>
  );
};

export default App;

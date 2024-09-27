// components
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/CommonComponents/ScrollToTop";
import ErrorBoundary from "./components/CommonComponents/ErrorBoundary";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      // Handle 400 errors globally
      return Promise.reject(error.response.data); // Pass the data for local handling
    }
    return Promise.reject(error); // Handle other errors
  }
);
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

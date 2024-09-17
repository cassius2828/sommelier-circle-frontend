import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// styles
import "./index.css";
import "react-quill/dist/quill.snow.css";
// providers
import { AuthProvider } from "./context/auth/AuthContext.jsx";
import { BlogProvider } from "./context/blog/BlogContext.jsx";
import { GlobalProvider } from "./context/global/GlobalProvider.jsx";
import { PlacesProvider } from "./context/places/PlacesContext.jsx";
import { EventsProvider } from "./context/events/EventsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* global  */}
    <GlobalProvider>
      {/* auth provider */}
      <AuthProvider>
        {/* blog provider */}
        <BlogProvider>
          {/* EventsProvider */}
          <EventsProvider>
            {/* PlacesProvider */}
            <PlacesProvider>
              {/* router */}
              <BrowserRouter>
                {/* app */}
                <App />
                {/*  */}
              </BrowserRouter>
              {/*  */}
            </PlacesProvider>
            {/*  */}
          </EventsProvider>
          {/*  */}
        </BlogProvider>
        {/*  */}
      </AuthProvider>
      {/*  */}
    </GlobalProvider>
    {/*  */}
  </React.StrictMode>
);

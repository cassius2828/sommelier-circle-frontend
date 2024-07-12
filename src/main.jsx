// src/main.jsx

import { BrowserRouter } from "react-router-dom"; // import BrowserRouter
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-quill/dist/quill.snow.css";

import { AuthProvider } from "./context/auth/AuthContext.jsx";
import { BlogProvider } from "./context/blog/BlogContext.jsx";
import { GlobalProvider } from "./context/global/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* global  */}
    <GlobalProvider>
      {/* auth provider */}
      <AuthProvider>
        {/* blog provider */}
        <BlogProvider>
          {/* router */}
          <BrowserRouter>
            {/* app */}
            <App />
            {/*  */}
          </BrowserRouter>
          {/*  */}
        </BlogProvider>
        {/*  */}
      </AuthProvider>
      {/*  */}
    </GlobalProvider>
    {/*  */}
  </React.StrictMode>
);

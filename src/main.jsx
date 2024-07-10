// src/main.jsx

import { BrowserRouter } from "react-router-dom"; // import BrowserRouter
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import { AuthProvider } from "./context/blog/auth/AuthContext.jsx";
import { BlogProvider } from "./context/blog/BlogContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* auth provider */}
    <AuthProvider>
      {/* blog provider */}
      <BlogProvider>
        {/* router */}
        <BrowserRouter>
        {/* app */}
          <App />
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);

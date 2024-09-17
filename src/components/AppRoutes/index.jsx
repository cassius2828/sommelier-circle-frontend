// src/components/AppRoutes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import routes from "../../routeConfig/indexRoutes.jsx";
import { Suspense } from "react";
import NotFound404 from "../CommonComponents/NotFound404.jsx";
import Loader from "../CommonComponents/Loader.jsx";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

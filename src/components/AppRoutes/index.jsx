// src/components/AppRoutes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import routes from "../../routeConfig/indexRoutes.jsx";
import { Suspense } from "react";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

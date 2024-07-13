// src/routes/criticRoutes.js
import { lazy } from "react";

const Critics = lazy(() => import("../components/Critics"));
const ShowCritic = lazy(() => import("../components/Critics/ShowCritic"));

const criticRoutes = [
  { path: "critics", element: <Critics /> },
  { path: "critics/:criticId", element: <ShowCritic /> },
];

export default criticRoutes;

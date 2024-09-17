import { lazy } from "react";
import FavoriteCritics from "../components/Critics/FavoriteCritics";

const Critics = lazy(() => import("../components/Critics"));
const ShowCritic = lazy(() => import("../components/Critics/ShowCritic"));

const criticRoutes = [
  { path: "critics", element: <Critics /> },
  { path: "favorites/critics/:userId", element: <FavoriteCritics /> },
  { path: "critics/:criticId", element: <ShowCritic /> },
];

export default criticRoutes;

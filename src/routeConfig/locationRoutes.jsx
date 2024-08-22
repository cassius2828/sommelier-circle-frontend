// src/routes/LocationRoutes.js
import { lazy } from "react";

const Locations = lazy(() => import("../components/Locations"));
const ShowLocation = lazy(() => import("../components/Locations/ShowLocation"));

const locationRoutes = [
  { path: "locations/explore", element: <Locations /> },
  { path: "locations/location-details/:locationId", element: <ShowLocation /> },
];

export default locationRoutes;

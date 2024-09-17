import { lazy } from "react";
import FavoriteLocations from "../components/Locations/FavoriteLocations";

const Locations = lazy(() => import("../components/Locations"));
const ShowLocation = lazy(() => import("../components/Locations/ShowLocation"));

const locationRoutes = [
  { path: "locations/explore", element: <Locations /> },
  { path: "locations/location-details/:locationId", element: <ShowLocation /> },
  { path: "favorites/locations/:userId", element: <FavoriteLocations /> },
];

export default locationRoutes;

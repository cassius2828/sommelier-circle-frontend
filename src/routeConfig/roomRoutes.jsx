// src/routes/roomRoutes.js
import { lazy } from "react";

const Rooms = lazy(() => import("../components/Rooms"));
const ShowRoom = lazy(() => import("../components/Rooms/ShowRoom"));

const roomRoutes = [
  { path: "rooms/explore", element: <Rooms /> },
  { path: "rooms/room-details/:roomId", element: <ShowRoom /> },
];

export default roomRoutes;

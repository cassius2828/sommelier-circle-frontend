// src/routes/eventRoutes.js
import { lazy } from "react";

const Events = lazy(() => import("../components/Events"));
const ShowEvent = lazy(() => import("../components/Events/ShowEvent"));

const eventRoutes = [
  { path: "events", element: <Events /> },
  { path: "events/:eventId", element: <ShowEvent /> },
];
export default eventRoutes;
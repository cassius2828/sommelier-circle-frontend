// src/routes/eventRoutes.js
import { lazy } from "react";
import CreateEvent from "../components/Events/CreateEvent";
import MyEvents from "../components/Events/MyEvents";

const Events = lazy(() => import("../components/Events"));
const ShowEvent = lazy(() => import("../components/Events/ShowEvent"));

const eventRoutes = [
  { path: "events", element: <Events /> },
  { path: "events/my-events", element: <MyEvents /> },
  { path: "events/create", element: <CreateEvent /> },
  { path: "events/:eventId", element: <ShowEvent /> },
];
export default eventRoutes;

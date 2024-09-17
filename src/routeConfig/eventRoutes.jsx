import { lazy } from "react";
import CreateEvent from "../components/Events/CreateEvent";
import MyEvents from "../components/Events/MyEvents";
import ConfirmTransaction from "../components/Events/Tickets/ConfirmTransaction";
import FavoriteEvents from "../components/Events/FavoriteEvents";

const Events = lazy(() => import("../components/Events"));
const ShowEvent = lazy(() => import("../components/Events/ShowEvent"));

const eventRoutes = [
  { path: "events", element: <Events /> },
  { path: "events/my-events", element: <MyEvents /> },
  { path: "events/create", element: <CreateEvent /> },
  { path: "favorites/events/:userId", element: <FavoriteEvents /> },
  { path: "events/:eventId", element: <ShowEvent /> },
  { path: "events/:eventId/edit", element: <CreateEvent /> },
  {
    path: "events/:eventId/confirm-transaction",
    element: <ConfirmTransaction />,
  },
];
export default eventRoutes;

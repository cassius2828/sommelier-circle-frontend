import React, { Suspense } from 'react';
const Landing = React.lazy(() => import("../components/Landing/Landing"));

import authRoutes from "./authRoutes";
import blogRoutes from "./blogRoutes";
import wineRoutes from "./wineRoutes";
import criticRoutes from "./criticRoutes";
import roomRoutes from "./roomRoutes";
import eventRoutes from "./eventRoutes";
import profileRoutes from "./profileRoutes";

const routes = [
  { path: "/", element: <Suspense fallback={<div>Loading...</div>}><Landing /></Suspense> },
  ...authRoutes,
  ...blogRoutes,
  ...wineRoutes,
  ...criticRoutes,
  ...roomRoutes,
  ...eventRoutes,
  ...profileRoutes,
];

export default routes;

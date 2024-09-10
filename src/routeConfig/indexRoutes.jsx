import React, { Suspense } from "react";
const Landing = React.lazy(() => import("../components/Landing/Landing"));

import authRoutes from "./authRoutes";
import blogRoutes from "./blogRoutes";
import wineRoutes from "./wineRoutes";
import criticRoutes from "./criticRoutes";
import locationRoutes from "./locationRoutes";
import eventRoutes from "./eventRoutes";
import profileRoutes from "./profileRoutes";

const routes = [
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Landing />
      </Suspense>
    ),
  },
  ...authRoutes,
  ...blogRoutes,
  ...wineRoutes,
  ...criticRoutes,
  ...locationRoutes,
  ...eventRoutes,
  ...profileRoutes,
];

export default routes;

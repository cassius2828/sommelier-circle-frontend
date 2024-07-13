// src/routes/wineRoutes.js
import { lazy } from "react";

const Wines = lazy(() => import("../components/Wines"));
const TypesOfWine = lazy(() => import("../components/Wines/Pages/TypesOfWine"));
const ShowWine = lazy(() => import("../components/Wines/ShowWine"));

const wineRoutes = [
  { path: "wines", element: <Wines /> },
  { path: "wines/wine-types", element: <TypesOfWine allStyles blogId={`6691aea098a19fabd8baa1d4`} /> },
  { path: "wines/red/light-and-perfumed", element: <TypesOfWine blogId={`669204691ad26a1dbfe1b0cc`} /> },
  { path: "wines/:wineId", element: <ShowWine /> },
];

export default wineRoutes;

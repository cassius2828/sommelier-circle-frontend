// src/routes/wineRoutes.js
import { lazy } from "react";

const Wines = lazy(() => import("../components/Wines"));
const TypesOfWine = lazy(() => import("../components/Wines/Pages/TypesOfWine"));
const ShowWine = lazy(() => import("../components/Wines/ShowWine"));

const wineRoutes = [
  // base path
  { path: "wines", element: <Wines /> },
  // wine types
  { path: "wines/wine-types", element: <TypesOfWine allStyles blogId={`6691aea098a19fabd8baa1d4`} /> },
//  red wines
  { path: "wines/red/light-and-perfumed", element: <TypesOfWine blogId={`669204691ad26a1dbfe1b0cc`} /> },
  { path: "wines/red/savory-and-classic", element: <TypesOfWine blogId={`669211b11ad26a1dbfe1b123`} /> },
  { path: "wines/red/bold-and-structured", element: <TypesOfWine blogId={`6692127e1ad26a1dbfe1b12d`} /> },
  { path: "wines/red/rich-and-intense", element: <TypesOfWine blogId={`669212e01ad26a1dbfe1b13b`} /> },
//  white wines
  { path: "wines/white/aromatic-and-floral", element: <TypesOfWine blogId={`669213371ad26a1dbfe1b141`} /> },
  { path: "wines/white/green-and-flinty", element: <TypesOfWine blogId={`669213ba1ad26a1dbfe1b14b`} /> },
  { path: "wines/white/tropical-and-balanced", element: <TypesOfWine blogId={`669213fb1ad26a1dbfe1b151`} /> },
  { path: "wines/white/buttery-and-complex", element: <TypesOfWine blogId={`669214601ad26a1dbfe1b157`} /> },
  { path: "wines/white/dry-and-nutty", element: <TypesOfWine blogId={`669214b01ad26a1dbfe1b15d`} /> },
//  dessert wines
  { path: "wines/dessert/caramelized-and-sticky", element: <TypesOfWine blogId={`669214fb1ad26a1dbfe1b163`} /> },
  { path: "wines/dessert/rich-and-warming", element: <TypesOfWine blogId={`669215631ad26a1dbfe1b169`} /> },
  { path: "wines/dessert/lush-and-balanced", element: <TypesOfWine blogId={`669215cd1ad26a1dbfe1b16f`} /> },
//  rose wines
  { path: "wines/rose/crisp-and-dry", element: <TypesOfWine blogId={`669216771ad26a1dbfe1b179`} /> },
  { path: "wines/rose/rich-and-fruity", element: <TypesOfWine blogId={`669216e01ad26a1dbfe1b183`} /> },
//  sparkling wines
  { path: "wines/sparkling/fresh-and-youthful", element: <TypesOfWine blogId={`6692173d1ad26a1dbfe1b189`} /> },
  { path: "wines/sparkling/complex-and-traditional", element: <TypesOfWine blogId={`669217831ad26a1dbfe1b18f`} /> },
  { path: "wines/sparkling/berries-and-cream", element: <TypesOfWine blogId={`669218361ad26a1dbfe1b19d`} /> },
  { path: "wines/sparkling/sweet-and-spritzy", element: <TypesOfWine blogId={`669218731ad26a1dbfe1b1a3`} /> },
  // show wine
  { path: "wines/:wineId", element: <ShowWine /> },
];

export default wineRoutes;

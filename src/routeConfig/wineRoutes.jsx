// src/routes/wineRoutes.js
import { lazy } from "react";
import WineSearch from "../components/Wines/Search/WineSearchGallery";

const CategoryGallery  = lazy(() => import("../components/Wines/CategoryGallery"));
const TypesOfWine = lazy(() => import("../components/Wines/Pages/TypesOfWine"));
const ShowWine = lazy(() => import("../components/Wines/ShowWine"));

const wineRoutes = [
  // base path
  { path: "wines/styles", element: <CategoryGallery category="wine-styles" /> },
  { path: "wines/regions", element: <CategoryGallery category="wine-regions" /> },
  { path: "wines/grapes", element: <CategoryGallery category="grapes" /> },
  { path: "wines/search", element: <WineSearch /> },
// regions
  { path: "wines/regions/napa-valley", element: <TypesOfWine allStyles blogId={`6692415bd74ed7e5212b8e19`} /> },
  { path: "wines/regions/willamette-valley", element: <TypesOfWine allStyles blogId={`66924193d74ed7e5212b8e1f`} /> },
  { path: "wines/regions/loire-valley", element: <TypesOfWine allStyles blogId={`66924870d74ed7e5212b8e73`} /> },
  { path: "wines/regions/bordeaux", element: <TypesOfWine allStyles blogId={`66924906d74ed7e5212b8e79`} /> },
  { path: "wines/regions/champagne", element: <TypesOfWine allStyles blogId={`669249e8d74ed7e5212b8e89`} /> },
  { path: "wines/regions/tuscany", element: <TypesOfWine allStyles blogId={`6692e903d74ed7e5212b8ead`} /> },
  { path: "wines/regions/barossa-valley", element: <TypesOfWine allStyles blogId={`6692e968d74ed7e5212b8eb3`} /> },
  { path: "wines/regions/mosel", element: <TypesOfWine allStyles blogId={`6692e9d7d74ed7e5212b8eb9`} /> },
  { path: "wines/regions/rioja", element: <TypesOfWine allStyles blogId={`6692ea28d74ed7e5212b8ebf`} /> },
  { path: "wines/regions/marlborough", element: <TypesOfWine allStyles blogId={`6692eb69d74ed7e5212b8ecb`} /> },
  { path: "wines/regions/piedmont", element: <TypesOfWine allStyles blogId={`6692ebc1d74ed7e5212b8ed1`} /> },
  { path: "wines/regions/rhone-valley", element: <TypesOfWine allStyles blogId={`6692ec1ad74ed7e5212b8ed7`} /> },
  { path: "wines/regions/stellenbosch", element: <TypesOfWine allStyles blogId={`6692ec5ed74ed7e5212b8edd`} /> },
  { path: "wines/regions/sonoma-county", element: <TypesOfWine allStyles blogId={`6692ecabd74ed7e5212b8ee3`} /> },
  { path: "wines/regions/regions-info", element: <TypesOfWine allStyles blogId={`6692f3bbd74ed7e5212b8f83`} /> },

// grapes
{ path: "wines/grapes/cabernet-sauvignon", element: <TypesOfWine allStyles blogId={`6692f7a7d74ed7e5212b8fb3`} /> },
{ path: "wines/grapes/chardonnay", element: <TypesOfWine allStyles blogId={`6692f88ed74ed7e5212b8fb9`} /> },
{ path: "wines/grapes/merlot", element: <TypesOfWine allStyles blogId={`6692f90dd74ed7e5212b8fbf`} /> },
{ path: "wines/grapes/sauvignon-blanc", element: <TypesOfWine allStyles blogId={`6692f9bed74ed7e5212b8fc5`} /> },
{ path: "wines/grapes/pinot-noir", element: <TypesOfWine allStyles blogId={`6692fa59d74ed7e5212b8fcb`} /> },
{ path: "wines/grapes/syrah", element: <TypesOfWine allStyles blogId={`6692fb18d74ed7e5212b8fd1`} /> },
{ path: "wines/grapes/zinfandel", element: <TypesOfWine allStyles blogId={`6692fb60d74ed7e5212b8fd7`} /> },
{ path: "wines/grapes/malbec", element: <TypesOfWine allStyles blogId={`6692fbc3d74ed7e5212b8fdd`} /> },
{ path: "wines/grapes/riesling", element: <TypesOfWine allStyles blogId={`6692fc44d74ed7e5212b8fe3`} /> },
{ path: "wines/grapes/grapes-info", element: <TypesOfWine allStyles blogId={`669300b3d74ed7e5212b9011`} /> },


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

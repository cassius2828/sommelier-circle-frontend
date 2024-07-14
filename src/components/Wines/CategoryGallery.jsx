/* eslint-disable react/prop-types */
// src/components/WineStyles.jsx

import React, { useEffect } from "react";
import useGlobalContext from "../../context/global/useGlobalContext";
import { Link } from "react-router-dom";
import SearchBar from "../CommonComponents/SearchBar";

////////////////////
// CategoryGallery Component
///////////////////

const CategoryGallery = ({ category }) => {
  const { scrollToTop, wineCategories, wineRegions, grapeCategories } =
    useGlobalContext();

  useEffect(() => {
    scrollToTop();
  }, []);

  ////////////////////
  // Variables Initialization
  ////////////////////

  let title;
  let showFooter;
  let array;
  let learnMoreTitle;
  let learnMoreDescription;
  let learnMoreLink;
  let learnMoreImg;

  ////////////////////
  // Switch Case for Category
  ////////////////////

  switch (category) {
    case "wine-styles":
      title = "Wine Styles";
      showFooter = true;
      array = wineCategories;
      learnMoreTitle = "Types of Wine";
      learnMoreDescription = `
        Take a broader look at the huge range of choices which face wine
        lovers and enthusiasts alike. Explore the basics such as red wine,
        white wine, rosé, dessert and sparkling wine, through to grape
        varieties, regions and appellations. There are also different
        winemaking techniques to consider, categories such as organic,
        vegan-friendly and kosher wine, and food and wine pairing.
      `;
      learnMoreLink = "/wines/wine-types";
      learnMoreImg = `https://www.wine-searcher.com/images/wine-glass.jpg?width=559&height=230&fit=crop`;

      break;
    case "wine-regions":
      title = "Wine Regions";
      showFooter = false;
      array = wineRegions;
      learnMoreTitle = "The Significance of Regions";
      learnMoreDescription = `
        Wine regions are pivotal to viticulture and winemaking, significantly influencing the characteristics and quality of the wine produced. Each region offers a unique combination of climate, soil, topography, and local winemaking traditions, collectively known as "terroir." This terroir imparts distinct flavors and aromas to the wines, making each region's wines unique. For example, Bordeaux's gravelly soils and maritime climate produce structured, tannic red wines, while the cool, limestone-rich slopes of Burgundy yield elegant, aromatic Pinot Noirs and Chardonnays. Furthermore, regional regulations and appellation systems ensure quality and authenticity, guiding wine enthusiasts in their selections. Understanding these differences enriches the appreciation of wine, highlighting the intricate relationship between a wine and its origin.
      `;
      learnMoreLink = "/wines/regions/regions-info";
      learnMoreImg = `https://vividmaps.com/wp-content/uploads/2019/12/wine-around-world-1.jpg`;
      break;
    case "spirits":
      title = "Spirits";
      showFooter = false;
      // array = wineCategories;
      learnMoreTitle = "Types of Wine";
      learnMoreDescription = `
        Take a broader look at the huge range of choices which face wine
        lovers and enthusiasts alike. Explore the basics such as red wine,
        white wine, rosé, dessert and sparkling wine, through to grape
        varieties, regions and appellations. There are also different
        winemaking techniques to consider, categories such as organic,
        vegan-friendly and kosher wine, and food and wine pairing.
      `;
      learnMoreLink = "/wines/wine-types";
      break;
    case "grapes":
      title = "Grape Varieties";
      showFooter = false;
      array = grapeCategories;
      learnMoreTitle = "Essential Grape Varieties for Viticulture";
      learnMoreDescription = `
        Grape varieties play a crucial role in viticulture and winemaking, as they fundamentally determine the flavor, aroma, and overall character of the wine. Each grape variety has unique characteristics influenced by its genetic makeup, which in turn interacts with the terroir—the combination of climate, soil, and topography of the vineyard where it is grown. For example, Cabernet Sauvignon, known for its robust structure and tannins, thrives in warmer climates like Bordeaux, producing wines with flavors of blackcurrant, cedar, and mint. In contrast, cooler climates favor grapes like Pinot Noir, which yields elegant, aromatic wines with notes of cherry, raspberry, and earthy undertones. The diversity in grape varieties allows winemakers to craft a wide range of wine styles, from light and perfumed to bold and structured. Understanding the attributes of different grape varieties enhances the appreciation of wine, showcasing the intricate relationship between the grape and its environment, and highlighting the artistry involved in winemaking.
      `;
      learnMoreLink = "/wines/grapes/grapes-info";
      learnMoreImg = `https://www.wollersheim.com/wp-content/uploads/GrapeVarietals2021_lo-res.jpg`;

      break;
    default:
      title = "Default Category";
      showFooter = false;
      break;
  }

  console.log(`Title: ${title}, Show Footer: ${showFooter}`);

  return (
    <div className="bg-neutral-950 text-gray-100 min-h-screen p-8 mt-52">
      <div className="max-w-[120rem] mx-auto">
        <SearchBar />
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
        {/* Categories */}
        {array.map((category, index) => (
          <div key={index} className="mb-12 bg-neutral-900 p-6 rounded-md">
            <h2 className="text-3xl font-semibold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.types.map((type, idx) => (
                <Link key={idx} to={`${type.path}`}>
                  <div className=" rounded-lg overflow-hidden shadow-xl">
                    <img
                      className="w-full h-48 object-cover"
                      src={type.img}
                      alt={type.name}
                    />
                    <div className="p-4">
                      <h3 className="text-2xl font-semibold mb-2">
                        {type.name}
                      </h3>
                      <p className="text-gray-400">{type.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* extra info box */}
      <div className="mb-12 bg-neutral-900 p-6 rounded-md max-w-[120rem] mx-auto flex justify-between gap-12">
        <img className="rounded-md w-1/2" src={learnMoreImg} alt="" />

        <div className="flex flex-col items-center justify-between">
          <div>
            <h2 className="text-4xl mb-12 text-center">{learnMoreTitle}</h2>
            <p className="text-xl">{learnMoreDescription}</p>
          </div>
          <Link to={learnMoreLink}>
            <button className="px-6 py-4 border rounded-md relative text-3xl text-gray-100 border-gray-100 capitalize hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 ease-in-out -translate-y-1">
              learn more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryGallery;

// src/components/WineStyles.jsx
import React, { useEffect } from "react";
import useGlobalContext from "../../context/global/useGlobalContext";
const categories = [
  {
    title: "Red Wine",
    types: [
      {
        name: "Light and Perfumed",
        description:
          "Beaujolais and other Gamays, Bourgogne rouge, lighter Pinot Noirs, Portugieser, and Valpolicella. These wines are known for their aromatic profiles, often featuring floral notes such as violet and rose, and fruit-forward flavors like cherry and raspberry.",
        img: "https://www.wine-searcher.com/images/wine_style/red-light-and-perfumed-1-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Savory and Classic",
        description:
          "Many Bordeaux wines, top Burgundy reds, Chianti and other Sangiovese wines from Tuscany, Rioja, and Tempranillo from Spain. These wines typically exhibit a balance of fruit, acidity, and tannins with savory notes such as herbs, tobacco, and earth.",
        img: "https://www.wine-searcher.com/images/wine_style/red-savory-and-classic-2-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Bold and Structured",
        description:
          "Napa Valley Cabernet Sauvignon, South African Bordeaux blends, Brunello di Montalcino, and Barolo. These wines are known for their robust tannin structure, high acidity, and intense flavors of dark fruit, leather, and spice.",
        img: "https://www.wine-searcher.com/images/wine_style/red-bold-and-structured-3-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Rich and Intense",
        description:
          "Australian Shiraz, Zinfandel from California, red Châteauneuf-du-Pape, Ribera del Duero. These wines are full-bodied with high alcohol content and flavors of black fruit, chocolate, and pepper.",
        img: "https://www.wine-searcher.com/images/wine_style/red-rich-and-intense-4-2-2.jpg?width=265&height=149&fit=crop",
      },
    ],
  },
  {
    title: "White Wine",
    types: [
      {
        name: "Aromatic and Floral",
        description:
          "Gewürztraminer, Riesling, Muscat, and Torrontés. These wines are characterized by their strong floral aromas and flavors of lychee, rose, and tropical fruits.",
        img: "https://www.wine-searcher.com/images/wine_style/white-aromatic-and-floral-5-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Green and Flinty",
        description:
          "Sauvignon Blanc from the Loire Valley, Grüner Veltliner from Austria, Aligoté, and Assyrtiko from Greece. These wines are noted for their high acidity, minerality, and flavors of green apple, lime, and herbs.",
        img: "https://www.wine-searcher.com/images/wine_style/white-green-and-flinty-6-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Tropical and Balanced",
        description:
          "Chardonnay from California, Chenin Blanc from South Africa, Viognier, and Semillon. These wines offer balanced acidity and flavors of tropical fruits like pineapple and mango, often with a creamy texture.",
        img: "https://www.wine-searcher.com/images/wine_style/white-tropical-and-balanced-7-2-3.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Buttery and Complex",
        description:
          "Oaked Chardonnay from California and Burgundy, Marsanne, and Roussanne. These wines have a rich, creamy texture with flavors of butter, vanilla, and baked apple.",
        img: "https://www.wine-searcher.com/images/wine_style/white-buttery-and-complex-8-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Dry and Nutty",
        description:
          "Fino Sherry from Spain, Verdelho, and aged Chenin Blanc. These wines are known for their dry, nutty flavors with a hint of salinity.",
        img: "https://www.wine-searcher.com/images/wine_style/white-dry-and-nutty-11-2-3.jpg?width=265&height=149&fit=crop",
      },
    ],
  },
  {
    title: "Dessert Wine",
    types: [
      {
        name: "Caramelized and Sticky",
        description:
          "Sauternes from Bordeaux, Tokaji from Hungary, and Noble Rot Riesling. These wines are intensely sweet with flavors of honey, caramel, and dried apricot.",
        img: "https://www.wine-searcher.com/images/wine_style/dessert-caramelized-and-sticky-14-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Rich and Warming",
        description:
          "Port from Portugal, Banyuls from France, and Vin Santo from Italy. These fortified wines have rich, warming flavors of dried fruit, chocolate, and spices.",
        img: "https://www.wine-searcher.com/images/wine_style/dessert-rich-and-warming-13-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Lush and Balanced",
        description:
          "Ice Wine from Canada, Late Harvest Riesling from Germany, and Pedro Ximénez Sherry. These wines offer a lush texture with balanced acidity and flavors of ripe tropical fruit and honey.",
        img: "https://www.wine-searcher.com/images/wine_style/dessert-lush-and-balanced-12-2-2.jpg?width=265&height=149&fit=crop",
      },
    ],
  },
  {
    title: "Rosé Wine",
    types: [
      {
        name: "Crisp and Dry",
        description:
          "Provence Rosé, Pinot Noir Rosé, and Sangiovese Rosé. These wines are known for their crisp acidity and dry finish with flavors of strawberry, citrus, and melon.",
        img: "https://www.wine-searcher.com/images/wine_style/rose-crisp-and-dry-9-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Rich and Fruity",
        description:
          "Grenache Rosé, Syrah Rosé, and Tempranillo Rosé. These wines have a richer body and more intense fruit flavors, often featuring raspberry, cherry, and peach.",
        img: "https://www.wine-searcher.com/images/wine_style/rose-rich-and-fruity-10-2-2.jpg?width=265&height=149&fit=crop",
      },
    ],
  },
  {
    title: "Sparkling Wine",
    types: [
      {
        name: "Fresh and Youthful",
        description:
          "Prosecco from Italy, Cava from Spain, and Sparkling Rosé. These wines are light and refreshing with flavors of green apple, pear, and citrus.",
        img: "https://www.wine-searcher.com/images/wine_style/sparkling-fresh-and-youthful-15-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Complex and Traditional",
        description:
          "Champagne from France, Franciacorta from Italy, and Traditional Method Sparkling Wines. These wines have complex flavors of brioche, almond, and citrus with fine bubbles.",
        img: "https://www.wine-searcher.com/images/wine_style/sparkling-complex-and-traditional-16-2-2.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Berries and Cream",
        description:
          "Brachetto d'Acqui from Italy, Sparkling Shiraz from Australia, and Sparkling Red Wines. These wines have flavors of ripe berries, cream, and a touch of sweetness.",
        img: "https://www.wine-searcher.com/images/wine_style/sparkling-berries-and-cream-17-2-3.jpg?width=265&height=149&fit=crop",
      },
      {
        name: "Sweet and Spritzy",
        description:
          "Asti Spumante from Italy, Moscato d'Asti, and Demi-Sec Champagne. These wines are sweet and lightly sparkling with flavors of peach, apricot, and honey.",
        img: "https://www.wine-searcher.com/images/wine_style/sparkling-sweet-and-spritzy-18-2-2.jpg?width=265&height=149&fit=crop",
      },
    ],
  },
];
const WineStyles = () => {
  const { scrollToTop } = useGlobalContext();
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="bg-neutral-950 text-gray-100 min-h-screen p-8 mt-52">
      <div className="max-w-[120rem] mx-auto">
        {/* Search Bar */}
        <div className="relative mb-8 w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-4 text-gray-800 rounded-md"
          />
          <button className="absolute right-0 top-0 mt-4 mr-4">
            <svg
              className="h-6 w-6 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.707 22.293l-6.387-6.386C18.177 14.187 19 12.176 19 10 19 4.486 14.514 0 9 0S-1 4.486-1 10s4.486 10 10 10c2.176 0 4.187-.823 5.907-2.321l6.386 6.387c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414zM2 10c0-3.859 3.141-7 7-7s7 3.141 7 7-3.141 7-7 7-7-3.141-7-7z" />
            </svg>
          </button>
        </div>
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-center">Wine Styles</h1>
        {/* Categories */}
        {categories.map((category, index) => (
          <div key={index} className="mb-12 bg-neutral-900 p-6 rounded-md">
            <h2 className="text-3xl font-semibold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.types.map((type, idx) => (
                <div
                  key={idx}
                  className=" rounded-lg overflow-hidden shadow-xl"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={type.img}
                    alt={type.name}
                  />
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-12 bg-neutral-900 p-6 rounded-md max-w-[120rem] mx-auto flex justify-between gap-12">
        <img
          className="rounded-md"
          src="https://www.wine-searcher.com/images/wine-glass.jpg?width=559&height=230&fit=crop"
          alt=""
        />
        <div className="flex flex-col items-center justify-between">
          <div>
            <h2 className="text-4xl mb-12 text-center">Types of Wine</h2>
            <p className="text-xl">
              Take a broader look at the huge range of choices which face wine
              lovers and enthusiasts alike. Explore the basics such as red wine,
              white wine, rosé, dessert and sparkling wine, through to grape
              varieties, regions and appellations. There are also different
              winemaking techniques to consider, categories such as organic,
              vegan-friendly and kosher wine, and food and wine pairing.
            </p>
          </div>
          <button className="px-6 py-4 border rounded-md relative text-3xl text-gray-100 border-gray-100 capitalize hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 ease-in-out -translate-y-1">
            learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineStyles;

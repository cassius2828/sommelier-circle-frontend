/* eslint-disable react/prop-types */
import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const wineCategories = [
    {
      title: "Red Wine",
      types: [
        {
          name: "Light and Perfumed",
          description:
            "Beaujolais and other Gamays, Bourgogne rouge, lighter Pinot Noirs, Portugieser, and Valpolicella. These wines are known for their aromatic profiles, often featuring floral notes such as violet and rose, and fruit-forward flavors like cherry and raspberry.",
          img: "https://www.wine-searcher.com/images/wine_style/red-light-and-perfumed-1-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/red/light-and-perfumed",
        },
        {
          name: "Savory and Classic",
          description:
            "Many Bordeaux wines, top Burgundy reds, Chianti and other Sangiovese wines from Tuscany, Rioja, and Tempranillo from Spain. These wines typically exhibit a balance of fruit, acidity, and tannins with savory notes such as herbs, tobacco, and earth.",
          img: "https://www.wine-searcher.com/images/wine_style/red-savory-and-classic-2-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/red/savory-and-classic",
        },
        {
          name: "Bold and Structured",
          description:
            "Napa Valley Cabernet Sauvignon, South African Bordeaux blends, Brunello di Montalcino, and Barolo. These wines are known for their robust tannin structure, high acidity, and intense flavors of dark fruit, leather, and spice.",
          img: "https://www.wine-searcher.com/images/wine_style/red-bold-and-structured-3-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/red/bold-and-structured",
        },
        {
          name: "Rich and Intense",
          description:
            "Australian Shiraz, Zinfandel from California, red Châteauneuf-du-Pape, Ribera del Duero. These wines are full-bodied with high alcohol content and flavors of black fruit, chocolate, and pepper.",
          img: "https://www.wine-searcher.com/images/wine_style/red-rich-and-intense-4-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/red/rich-and-intense",
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
          path: "/wines/white/aromatic-and-floral",
        },
        {
          name: "Green and Flinty",
          description:
            "Sauvignon Blanc from the Loire Valley, Grüner Veltliner from Austria, Aligoté, and Assyrtiko from Greece. These wines are noted for their high acidity, minerality, and flavors of green apple, lime, and herbs.",
          img: "https://www.wine-searcher.com/images/wine_style/white-green-and-flinty-6-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/white/green-and-flinty",
        },
        {
          name: "Tropical and Balanced",
          description:
            "Chardonnay from California, Chenin Blanc from South Africa, Viognier, and Semillon. These wines offer balanced acidity and flavors of tropical fruits like pineapple and mango, often with a creamy texture.",
          img: "https://www.wine-searcher.com/images/wine_style/white-tropical-and-balanced-7-2-3.jpg?width=265&height=149&fit=crop",
          path: "/wines/white/tropical-and-balanced",
        },
        {
          name: "Buttery and Complex",
          description:
            "Oaked Chardonnay from California and Burgundy, Marsanne, and Roussanne. These wines have a rich, creamy texture with flavors of butter, vanilla, and baked apple.",
          img: "https://www.wine-searcher.com/images/wine_style/white-buttery-and-complex-8-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/white/buttery-and-complex",
        },
        {
          name: "Dry and Nutty",
          description:
            "Fino Sherry from Spain, Verdelho, and aged Chenin Blanc. These wines are known for their dry, nutty flavors with a hint of salinity.",
          img: "https://www.wine-searcher.com/images/wine_style/white-dry-and-nutty-11-2-3.jpg?width=265&height=149&fit=crop",
          path: "/wines/white/dry-and-nutty",
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
          path: "/wines/dessert/caramelized-and-sticky",
        },
        {
          name: "Rich and Warming",
          description:
            "Port from Portugal, Banyuls from France, and Vin Santo from Italy. These fortified wines have rich, warming flavors of dried fruit, chocolate, and spices.",
          img: "https://www.wine-searcher.com/images/wine_style/dessert-rich-and-warming-13-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/dessert/rich-and-warming",
        },
        {
          name: "Lush and Balanced",
          description:
            "Ice Wine from Canada, Late Harvest Riesling from Germany, and Pedro Ximénez Sherry. These wines offer a lush texture with balanced acidity and flavors of ripe tropical fruit and honey.",
          img: "https://www.wine-searcher.com/images/wine_style/dessert-lush-and-balanced-12-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/dessert/lush-and-balanced",
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
          path: "/wines/rose/crisp-and-dry",
        },
        {
          name: "Rich and Fruity",
          description:
            "Grenache Rosé, Syrah Rosé, and Tempranillo Rosé. These wines have a richer body and more intense fruit flavors, often featuring raspberry, cherry, and peach.",
          img: "https://www.wine-searcher.com/images/wine_style/rose-rich-and-fruity-10-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/rose/rich-and-fruity",
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
          path: "/wines/sparkling/fresh-and-youthful",
        },
        {
          name: "Complex and Traditional",
          description:
            "Champagne from France, Franciacorta from Italy, and Traditional Method Sparkling Wines. These wines have complex flavors of brioche, almond, and citrus with fine bubbles.",
          img: "https://www.wine-searcher.com/images/wine_style/sparkling-complex-and-traditional-16-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/sparkling/complex-and-traditional",
        },
        {
          name: "Berries and Cream",
          description:
            "Brachetto d'Acqui from Italy, Sparkling Shiraz from Australia, and Sparkling Red Wines. These wines have flavors of ripe berries, cream, and a touch of sweetness.",
          img: "https://www.wine-searcher.com/images/wine_style/sparkling-berries-and-cream-17-2-3.jpg?width=265&height=149&fit=crop",
          path: "/wines/sparkling/berries-and-cream",
        },
        {
          name: "Sweet and Spritzy",
          description:
            "Asti Spumante from Italy, Moscato d'Asti, and Demi-Sec Champagne. These wines are sweet and lightly sparkling with flavors of peach, apricot, and honey.",
          img: "https://www.wine-searcher.com/images/wine_style/sparkling-sweet-and-spritzy-18-2-2.jpg?width=265&height=149&fit=crop",
          path: "/wines/sparkling/sweet-and-spritzy",
        },
      ],
    },
  ];

  return (
    <GlobalContext.Provider value={{ scrollToTop, wineCategories }}>
      {children}
    </GlobalContext.Provider>
  );
};

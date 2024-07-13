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
  const grapeCategories = [
    {
      title: "Featured Grapes",
      types: [
        {
          img: "https://www.wine-searcher.com/images/grape/cabernet-sauvignon-76-1-3.jpg?width=285&height=160&fit=crop",
          name: "Cabernet Sauvignon",
          description:
            "A popular red wine grape variety known for its deep color, full body, and rich flavors of dark fruit and spices.",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/chardonnay-98-1-6.jpg?width=285&height=160&fit=crop",
          name: "Chardonnay",
          description:
            "A versatile white wine grape variety that produces a range of styles from crisp and citrusy to rich and buttery.",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/merlot-275-1-5.jpg?width=734",
          name: "Merlot",
          description:
            "A soft and fruity red wine grape variety with flavors of black cherry, plum, and hints of chocolate and herbs.",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/sauvignon-blanc-435-1-3.jpg?width=285&height=160&fit=crop",
          name: "Sauvignon Blanc",
          description:
            "A white wine grape variety known for its high acidity and flavors of green apple, lime, and tropical fruits.",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/pinot-noir-384-1-5.jpg?width=285&height=160&fit=crop",
          name: "Pinot Noir",
          description:
            "A delicate and complex red wine grape variety with flavors of red berries, earthy notes, and a silky texture.",
        },
        {
          img: "data:image/webp;base64,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",
          name: "Syrah",
          description:
            "A bold and spicy red wine grape variety with flavors of blackberry, black pepper, and smoky notes.",
        },

        {
          img: "data:image/webp;base64,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",
          name: "Zinfandel",
          description:
            "A red wine grape variety that produces robust wines with flavors of blackberry, raspberry, and pepper.",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/malbec-261-1-2.jpg?width=734",
          name: "Malbec",
          description:
            "A red wine grape variety known for its dark color, full body, and flavors of dark fruit, cocoa, and a hint of spice.",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/riesling_648931092d38c-407-1-5.jpg?width=285&height=160&fit=crop",
          name: "Riesling",
          description:
            "A highly aromatic white wine grape variety known for its floral aromas and flavors of peach, apricot, and honey.",
        },
      ],
    },
  ];

  const wineRegions = [
    {
      name: "Top Regions",
      types: [
        {
          name: "Napa Valley",
          country: "USA",
          description:
            "Renowned for its Cabernet Sauvignon and premium wineries, Napa Valley offers a rich diversity of wine styles and experiences.",
          img: "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/4/2024/04/25114129/shutterstock_2364793441-1880x880-1.jpg",
          path: "/wines/regions/napa-valley",
        },
        {
          name: "Bordeaux",
          country: "France",
          description:
            "Bordeaux is famous for its complex red blends, primarily made from Cabernet Sauvignon and Merlot, and its prestigious chateaux.",
          img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Bordeaux_Place_de_la_Bourse_de_nuit.jpg",
          path: "/wines/regions/bordeaux",
        },
        {
          name: "Tuscany",
          country: "Italy",
          description:
            "Home to the iconic Chianti and Brunello di Montalcino, Tuscany offers rich, earthy wines that reflect the region's storied history.",
          img: "https://i0.wp.com/touristjourney.com/wp-content/uploads/2022/01/Tuscany-tours-1024x685.jpg?resize=1024%2C685&ssl=1",
          path: "/wines/regions/tuscany",
        },
        {
          name: "Barossa Valley",
          country: "Australia",
          description:
            "Known for its robust Shiraz, Barossa Valley is one of Australia's oldest and most famous wine regions, producing bold, fruit-forward wines.",
          img: "https://images.luxuryescapes.com/q_auto:eco/2bq4dokx8n1s9o6eyk3i",
          path: "/wines/regions/barossa-valley",
        },
        {
          name: "Mosel",
          country: "Germany",
          description:
            "Famed for its Riesling, the Mosel region produces elegant, aromatic wines with high acidity and distinctive minerality.",
          img: "https://www.wine-searcher.com/images/region/mosel-1098-1-2.jpg",
          path: "/wines/regions/mosel",
        },
        {
          name: "Rioja",
          country: "Spain",
          description:
            "Known for its Tempranillo-based wines, Rioja offers a range of styles from fresh and fruity to rich and oak-aged.",
          img: "https://daily.sevenfifty.com/app/uploads/2018/05/SFD_Rioja_CR_iStock_2520x1420.jpg",
          path: "/wines/regions/rioja",
        },
        {
          name: "Champagne",
          country: "France",
          description:
            "The birthplace of sparkling wine, Champagne is synonymous with celebration and luxury, producing world-renowned bubbly wines.",
          img: "https://media.houseandgarden.co.uk/photos/64358764cad372a09340a7ef/master/w_1600%2Cc_limit/2HW1XF8.jpg",
          path: "/wines/regions/champagne",
        },
        {
          name: "Marlborough",
          country: "New Zealand",
          description:
            "Famous for its Sauvignon Blanc, Marlborough produces vibrant, aromatic wines with flavors of tropical fruit and fresh herbs.",
          img: "https://www.wineenthusiast.com/wp-content/uploads/2023/05/03_23_What_Does_Marlboroughs_New_Wine_Map_Say_About_Its_Future_HERO_ToiToi-Wines_1920x1280-1280x853.jpg",
          path: "/wines/regions/marlborough",
        },
        {
          name: "Piedmont",
          country: "Italy",
          description:
            "Home to Barolo and Barbaresco, Piedmont is renowned for its Nebbiolo-based wines, which are celebrated for their complexity and longevity.",
          img: "https://www.wine-searcher.com/images/region/piedmont-piemonte-3572-1-3.jpg",
          path: "/wines/regions/piedmont",
        },
        {
          name: "Rhone Valley",
          country: "France",
          description:
            "Known for its diverse range of wines, including Syrah, Grenache, and Viognier, the Rhone Valley offers robust reds and aromatic whites.",
          img: "https://www.visitfrenchwine.com/sites/default/files/vallee-du-rhone-photo-christophe-grilhe_1.jpg",
          path: "/wines/regions/rhone-valley",
        },
        {
          name: "Stellenbosch",
          country: "South Africa",
          description:
            "Stellenbosch is celebrated for its Cabernet Sauvignon and Chenin Blanc, producing wines with rich flavors and excellent structure.",
          img: "https://cdn.audleytravel.com/1050/750/79/1340295-stellenbosch-south-africa.webp",
          path: "/wines/regions/stellenbosch",
        },
        {
          name: "Sonoma County",
          country: "USA",
          description:
            "Offering a diverse range of wines, from Pinot Noir to Zinfandel, Sonoma County is known for its artisanal and innovative wineries.",
          img: "https://www.travelandleisure.com/thmb/kG_GNTflwMUfgWTnzQLGeDTHny4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TL_aerial-vineyards-sonoma-california_HERO_SONOMA1022-ec08a5d771164fc38fc6bcab295b2e94.jpg",
          path: "/wines/regions/sonoma-county",
        },
        {
          name: "Loire Valley",
          country: "France",
          description:
            "The Loire Valley is known for its crisp whites like Sauvignon Blanc and Chenin Blanc, as well as its elegant red and sparkling wines.",
          img: "https://www.touraineloirevalley.co.uk/wp-content/uploads/sites/2/2022/04/chateau-de-chenonceau-credit-adt-touraine-loic_lagarde_2031-2.jpg",
          path: "/wines/regions/loire-valley",
        },
        {
          name: "Willamette Valley",
          country: "USA",
          description:
            "Renowned for its Pinot Noir, Willamette Valley produces wines with bright acidity, red fruit flavors, and earthy undertones.",
          img: "https://res.cloudinary.com/dragonspell/images/w_1440,h_864,c_fill,dpr_auto,fl_progressive:steep,f_auto/w_1440,h_864/v1571421390/www.travelportland.com/NR_WineCountry_NorthWillametteVintners_6002994381_courtesy_VisitWashingtonCounty-1/NR_WineCountry_NorthWillametteVintners_6002994381_courtesy_VisitWashingtonCounty-1.jpg",
          path: "/wines/regions/willamette-valley",
        },
      ],
    },
  ];

  return (
    <GlobalContext.Provider
      value={{ scrollToTop, wineCategories, grapeCategories, wineRegions }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

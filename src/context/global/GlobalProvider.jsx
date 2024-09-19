import { useEffect, useState } from "react";
import Fuse from "fuse.js";
// services
import { getUserLocation } from "../../services/googlePlacesService";
import { getWines, postFilterWineResults } from "../../services/wineService";
import { getCriticsCount } from "../../services/criticService";
import {
  addItemToFavorites,
  addLocationsItemToFavorites,
} from "../../services/favoritesService";
// indexedDB
import {
  deleteItemIndexedDB,
  getItemIndexedDB,
  setItemIndexedDB,
} from "../../utils/indexedDB.config";
const initialFormData = {
  grape: "",
  region: "",
  style: "",
  winery: "",
  price: "",
  rating: "",
  query: "",
};
// context
import { GlobalContext } from "./GlobalContext";
export const GlobalProvider = ({ children }) => {
  const [wines, setWines] = useState([]);
  const [winesByCategory, setWinesByCategory] = useState([]);
  const [displayedWines, setDisplayedWines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCritics, setTotalCritics] = useState(0);
  const [favoritesMessage, setFavoritesMessage] = useState("");

  ///////////////////////////////
  // Hard Coded Data Sets for Categories
  ///////////////////////////////
  // wines styles
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
  // grapes
  const grapeCategories = [
    {
      title: "Featured Grapes",
      types: [
        {
          img: "https://www.wine-searcher.com/images/grape/cabernet-sauvignon-76-1-3.jpg?width=285&height=160&fit=crop",
          name: "Cabernet Sauvignon",
          description:
            "A popular red wine grape variety known for its deep color, full body, and rich flavors of dark fruit and spices.",
          path: "/wines/grapes/cabernet-sauvignon",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/chardonnay-98-1-6.jpg?width=285&height=160&fit=crop",
          name: "Chardonnay",
          description:
            "A versatile white wine grape variety that produces a range of styles from crisp and citrusy to rich and buttery.",
          path: "/wines/grapes/chardonnay",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/merlot-275-1-5.jpg?width=734",
          name: "Merlot",
          description:
            "A soft and fruity red wine grape variety with flavors of black cherry, plum, and hints of chocolate and herbs.",
          path: "/wines/grapes/merlot",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/sauvignon-blanc-435-1-3.jpg?width=285&height=160&fit=crop",
          name: "Sauvignon Blanc",
          description:
            "A white wine grape variety known for its high acidity and flavors of green apple, lime, and tropical fruits.",
          path: "/wines/grapes/sauvignon-blanc",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/pinot-noir-384-1-5.jpg?width=285&height=160&fit=crop",
          name: "Pinot Noir",
          description:
            "A delicate and complex red wine grape variety with flavors of red berries, earthy notes, and a silky texture.",
          path: "/wines/grapes/pinot-noir",
        },
        {
          img: "https://winecuentista.com/wp-content/uploads/2018/02/Cabernet-Sauvignon-Grapes-1.jpg",
          name: "Syrah",
          description:
            "A bold and spicy red wine grape variety with flavors of blackberry, black pepper, and smoky notes.",
          path: "/wines/grapes/syrah",
        },
        {
          img: "https://www.wine-searcher.com/images//grape/zinfandel-544-649a1b7baec4d.jpg",
          name: "Zinfandel",
          description:
            "A red wine grape variety that produces robust wines with flavors of blackberry, raspberry, and pepper.",
          path: "/wines/grapes/zinfandel",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/malbec-261-1-2.jpg?width=734",
          name: "Malbec",
          description:
            "A red wine grape variety known for its dark color, full body, and flavors of dark fruit, cocoa, and a hint of spice.",
          path: "/wines/grapes/malbec",
        },
        {
          img: "https://www.wine-searcher.com/images/grape/riesling_648931092d38c-407-1-5.jpg?width=285&height=160&fit=crop",
          name: "Riesling",
          description:
            "A highly aromatic white wine grape variety known for its floral aromas and flavors of peach, apricot, and honey.",
          path: "/wines/grapes/riesling",
        },
      ],
    },
  ];

  // regions
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

  ///////////////////////////
  // Fetch Critics Count
  ///////////////////////////
  useEffect(() => {
    const fetchCriticsCount = async () => {
      try {
        const data = await getCriticsCount();
        setTotalCritics(data);
      } catch (err) {
        console.error(err);
        console.log(
          `Unable to get critic count from service file. Error: ${err}`
        );
      }
    };
    fetchCriticsCount();
  }, []);

  ///////////////////////////
  // Fetch User Location and Country Code
  ///////////////////////////
  useEffect(() => {
    const fetchUserLocationAndCountryCode = async () => {
      getUserLocation();
    };
    fetchUserLocationAndCountryCode();
  }, []);
  ///////////////////////////
  // Form Data For Filtering Search
  ///////////////////////////
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.query);
  };

  ///////////////////////////
  // Fetch Filtered Wine Data | Whenever formData changes
  ///////////////////////////
  useEffect(() => {
    fetchFilteredWineData(formData);
  }, [formData]);

  ///////////////////////////////
  // Effect for Displaying Wines
  ///////////////////////////////

  useEffect(() => {
    setDisplayedWines(wines.slice(0, 20));
  }, [wines]);

  ///////////////////////////////
  // Fetch Wines Data
  ///////////////////////////////

  const fetchWines = async () => {
    setIsLoading(true);
    const cachedWines = await getItemIndexedDB("wines", "all");
    if (cachedWines) {
      setWines(cachedWines);
      setIsLoading(false);
      return;
    }
    try {
      const data = await getWines();
      setWines(data);
      await setItemIndexedDB("wines", data, "all");
    } catch (err) {
      console.log(`Error fetching wines: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////
  // Fetch Filtered Wine Data
  ///////////////////////////////

  const fetchFilteredWineData = async (formData) => {
    const { grape, region, style, price, rating, query } = formData;
    const invertedIdx = await getItemIndexedDB("wines", "invertedIndex");
    let wines = await getItemIndexedDB("wines", "all");
    // filter wine data from indexedDB
    if (invertedIdx && wines) {
      try {
        if (grape) {
          wines = wines.filter((wine) => wine.grape === grape);
        }
        if (region) {
          wines = wines.filter((wine) => wine.region === region);
        }
        if (style) {
          wines = wines.filter(
            (wine) => wine.category.toLocaleLowerCase() === style
          );
        }
        if (price) {
          if (price === "low") {
            wines = wines.sort((a, b) => a.avgPrice - b.avgPrice);
          } else {
            wines = wines.sort((a, b) => b.avgPrice - a.avgPrice);
          }
        }
        if (rating) {
          if (rating === "100") {
            wines = wines.filter((wine) => wine.criticScore === 100);
          } else if (rating === "95+") {
            wines = wines.filter((wine) => wine.criticScore > 94);
          } else {
            wines = wines.filter(
              (wine) => wine.criticScore > 89 && wine.criticScore < 95
            );
          }
        }
        if (query) {
          wines = searchInvertedIndex(query, wines, invertedIdx);
        }
        setWines(wines);
      } catch (err) {
        console.error(err);
      }
    } else {
      // fitler wine data on backend
      try {
        const data = await postFilterWineResults(formData);
        console.log(data);
        setWines(data);
      } catch (err) {
        console.log(`Error filtering and fetching wines: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  ///////////////////////////
  // Search Inverted Index
  ///////////////////////////

  const searchInvertedIndex = (query, wines, invertedIdx) => {
    //  split query into small array of words
    const obtainSearchWordsArray = query.toLocaleLowerCase().split(/\s+/);
    // initalize a set for unique wine indices
    const matchedWineIndices = new Set();
    // iterate over query and add each word to the set
    obtainSearchWordsArray.forEach((word) => {
      if (invertedIdx[word]) {
        invertedIdx[word].forEach((idx) => matchedWineIndices.add(idx));
      }
    });

    // inital matches | looking for inverted index exact  key name match
    const closelyMatchedWines = Array.from(matchedWineIndices).map(
      (idx) => wines[idx]
    );
    // if there is no inverted idx match then use the entire list
    const winesToSearch =
      closelyMatchedWines.length > 0 ? closelyMatchedWines : wines;
    // fuse options for fuzzy search
    const fuseOptions = {
      keys: ["name"],
      threshold: 0.3,
    };
    // initialize new fuse with wines to search adn options
    const fuse = new Fuse(winesToSearch, fuseOptions);
    const fuzzyResults = fuse.search(query);
    // match the wines with the logic of fuse
    const matchedWines = fuzzyResults.map((result) => result.item);
    return matchedWines;
  };

  ///////////////////////////////
  // Scroll to Top
  ///////////////////////////////

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  ///////////////////////////
  // Handle Add To Favorites
  ///////////////////////////
  const handleAddToFavorites = async (userId, itemId, itemType) => {
    if (!userId) {
      setFavoritesMessage(
        `Please sign in or create an account to add to your favorite ${itemType}`
      );
      return;
    }
    try {
      if (itemType === "locations") {
        const data = await addLocationsItemToFavorites(userId, itemId);
        setFavoritesMessage(data);
        return data;
      } else {
        const data = await addItemToFavorites(userId, itemId, itemType);
        setFavoritesMessage(data);
        return data;
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to add item to favorites`);
    }
  };

  ///////////////////////////
  // Handle Refresh Fav Location Cache | Adding Favorites for Locations
  ///////////////////////////
  const handleRefreshFavLocationCache = async (userId, place_id) => {
    try {
      const data = await handleAddToFavorites(userId, place_id, "locations");
      if (
        data === `Successfully added location to user's favorite locations list`
      ) {
        await deleteItemIndexedDB(`fav-locations-${userId}`, "locations");
      }
      console.log(data);
    } catch (err) {
      console.error(err);
      console.log(
        `Unable to handle location favorite and clear cache if a new favorite was added`
      );
    }
  };
  ///////////////////////////
  // Fetch all wines on load
  ///////////////////////////
  useEffect(() => {
    fetchWines();
  }, []);

  ///////////////////////////
  // Debouncing Function to Avoid Race Conditions in queries
  ///////////////////////////
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  return (
    <GlobalContext.Provider
      value={{
        debounce,
        fetchFilteredWineData,
        fetchWines,
        handleAddToFavorites,
        handleRefreshFavLocationCache,
        handleUpdateForm,
        scrollToTop,
        setDisplayedWines,
        setFavoritesMessage,
        setFormData,
        setIsLoading,
        setWines,
        setWinesByCategory,
        displayedWines,
        favoritesMessage,
        formData,
        grapeCategories,
        initialFormData,
        isLoading,
        totalCritics,
        wineCategories,
        wineRegions,
        wines,
        winesByCategory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

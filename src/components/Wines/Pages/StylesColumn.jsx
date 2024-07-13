/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const tempData = {
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
};

const StylesColumn = ({ style }) => {
  return (
    <div className="w-1/2 mt-96">
      <h3 className="border border-neutral-500 text-gray-100 text-4xl p-5">
        Other {tempData.title} Styles
      </h3>
      <ul className="flex flex-col items-start justify-start">
        <Link className="flex items-center gap-0 border border-neutral-500 w-full text-theme-sand hover:text-theme-sand-dark" to={`/wines`}>
        <span className="text-3xl ml-4">
            &laquo;
            </span>  
          <button className="text-xl p-4 text-theme-sand hover:text-theme-sand-dark transition-colors duration-200 ease-in-out">
            Styles Home
          </button>
        </Link>
        {tempData.types.map((type) => (
          <Link className="w-full" to={type.path} key={type.name + type.path}>
            <li className="hover:bg-neutral-700 hover:text-theme-sand text-gray-100 text-xl p-4 border border-neutral-500">
              <span>
                {tempData.title} - {type.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StylesColumn;

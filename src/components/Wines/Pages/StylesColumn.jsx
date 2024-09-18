import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";
import useBlogContext from "../../../context/blog/useBlogContext";

const StylesColumn = () => {
  const { wineCategories } = useGlobalContext();
  const { fetchStyleBlogPaths } = useBlogContext();
  const location = useLocation();
  const path = location.pathname;

  const wineStyle = path.split("/")[3].split("-");
  // split the url to grad the identifier of the style | ex: 'red'
  const wineType = path.split("/")[2];

  // filter to get category that matches the style in the url
  const selectedCategory = wineCategories.filter((category) => {
    //  our data is "style wine" so we split and get the style, to lowercase to compare correcrtly
    return category.title.split(" ")[0].toLowerCase() === wineType;
  });
  //   finds active style by performing operations on url section and data to make them both
  // joined lowercase strings
  const findActiveWineStyle = (wineStyleFromUrl, listStr) => {
    return (
      wineStyleFromUrl.join("").toLowerCase() ===
      listStr.split(" ").join("").toLowerCase()
    );
  };

  useEffect(() => {
    fetchStyleBlogPaths(selectedCategory[0].types);
  }, []);
  return (
    <div className="mx-5 md:mx-0 md:w-1/2 md:mt-96 ">
      <h3 className="border border-neutral-500 text-gray-100 text-4xl p-5">
        Other {selectedCategory[0]?.title} Styles
      </h3>
      <ul className="flex flex-col items-start justify-start">
        <Link
          className="flex items-center gap-0 border border-neutral-500 w-full text-theme-sand hover:text-theme-sand-dark"
          to={`/wines/styles`}
        >
          <span className="text-3xl ml-4">&laquo;</span>
          <button className="text-xl p-4 text-theme-sand hover:text-theme-sand-dark transition-colors duration-200 ease-in-out">
            All Styles
          </button>
        </Link>
        {selectedCategory[0]?.types.map((type) => (
          <Link className="w-full" to={type.path} key={type.name + type.path}>
            {findActiveWineStyle(wineStyle, type.name) ? "" : ""}
            <li
              className={`hover:bg-neutral-700 ${
                findActiveWineStyle(wineStyle, type.name)
                  ? "bg-theme-sand-dark"
                  : ""
              } hover:text-theme-sand text-gray-100 text-xl p-4 border border-neutral-500`}
            >
              <span>
                {selectedCategory[0].title} - {type.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StylesColumn;

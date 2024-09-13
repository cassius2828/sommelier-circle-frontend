import { Link, useLocation } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";
import { useEffect } from "react";
import useBlogContext from "../../../context/blog/useBlogContext";

export const AllStylesColumn = () => {
  const { wineCategories, wineRegions, grapeCategories } = useGlobalContext();
  const { fetchStyleBlogPaths } = useBlogContext();
  const location = useLocation();
  const urlIdenitfier = location.pathname.split("/")[2];
  // more readable way to use conditional logic for routing and ui based on url

  const isWineTypesUrl =
    urlIdenitfier !== "grapes" && urlIdenitfier !== "regions";

  // switch statement for data to be displayed based on url
  let array;
  switch (urlIdenitfier) {
    case "regions":
      array = wineRegions;
      break;
    case "grapes":
      array = grapeCategories;
      break;
    default:
      array = wineCategories;
      break;
  }
  // finds the category from the url | ex: red
  const findCurrentCategory = (urlStr, dataStr) => {
    return urlStr === dataStr.split("/")[3].split("-").join("");
  };
  // this avoids the error incase the url does not match grapes or regions | .split() is not a func
  let urlEnd;
  if (urlIdenitfier === "regions" || urlIdenitfier === "grapes") {
    urlEnd = location.pathname?.split("/")[3].split("-").join("");
  }
  useEffect(() => {
    fetchStyleBlogPaths(array[0].types);
   
  }, []);
  return (
    <div className=" w-1/2 mt-96 ">
      <h3 className="border border-neutral-500 text-gray-100 text-4xl p-5">
        Styles
      </h3>
      <Link
        className="flex items-center gap-0 border border-neutral-500 w-full text-theme-sand hover:text-theme-sand-dark"
        to={`/wines/${isWineTypesUrl ? "styles" : urlIdenitfier}`}
      >
        <span className="text-3xl ml-4">&laquo;</span>
        <button className="capitalize text-xl p-4 text-theme-sand hover:text-theme-sand-dark transition-colors duration-200 ease-in-out">
          Back to {isWineTypesUrl ? "Wine Styles" : urlIdenitfier} view
        </button>
      </Link>
      <ul className="flex flex-col items-start justify-start">
        {array.map((category) => {
          return category.types.map((type) => {
            return (
              <Link
                className="w-full"
                to={`${type.path}`}
                key={type.name + type.path}
              >
                <li
                  className={`hover:bg-neutral-700 ${
                    findCurrentCategory(urlEnd, type.path)
                      ? "bg-theme-sand-dark"
                      : ""
                  } hover:text-theme-sand  text-gray-100 text-xl p-4 border border-neutral-500 `}
                >
                  <span>
                    {category.title} - {type.name}
                  </span>
                </li>{" "}
              </Link>
            );
          });
        })}
      </ul>
    </div>
  );
};

import { Link, useLocation } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";

export const AllStylesColumn = () => {
  const { wineCategories, wineRegions, grapeCategories } = useGlobalContext();
  const location = useLocation();
  const urlIdenitfier = location.pathname.split("/")[2];

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
  const findCurrentCategory = (urlStr, dataStr) => {
    return urlStr === dataStr.split("/")[3].split("-").join("");
  };
  // this avoids the error incase the url does not match grapes or regions | .split() is not a func
  let urlEnd;
  if (urlIdenitfier === "regions" || urlIdenitfier === "grapes") {
    urlEnd = location.pathname?.split("/")[3].split("-").join("");
  }

  return (
    <div className=" w-1/2 mt-96 ">
      <h3 className="border border-neutral-500 text-gray-100 text-4xl p-5">
        Styles
      </h3>
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

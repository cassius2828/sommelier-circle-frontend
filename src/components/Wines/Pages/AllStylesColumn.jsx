import { Link } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";

export const AllStylesColumn = () => {
    const { wineCategories } = useGlobalContext();
    return (
      <div className=" w-1/2 mt-96 ">
        <h3 className="border border-neutral-500 text-gray-100 text-4xl p-5">
          Styles
        </h3>
        <ul className="flex flex-col items-start justify-start">
          {wineCategories.map((category) => {
            return category.types.map((type) => {
              return (
                <Link
                  className="w-full"
                  to={`${type.path}`}
                  key={type.name + type.path}
                >
                  <li className="hover:bg-neutral-700 hover:text-theme-sand text-gray-100 text-xl p-4 border border-neutral-500 ">
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
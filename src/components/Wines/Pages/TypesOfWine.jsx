import { Link } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";
import ShowBlog from "../../Blogs/ShowBlog";

const TypesOfWine = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-between gap-4">
        <ShowBlog propsBlogId={`6691aea098a19fabd8baa1d4`} />
        <StylesColumn />
      </div>{" "}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </>
  );
};
export default TypesOfWine;

export const StylesColumn = () => {
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
                to={`type.path`}
                key={type.name + type.path}
              >
                <li className="hover:bg-neutral-700 hover:text-rose-400 text-gray-100 text-xl p-4 border border-neutral-500 ">
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

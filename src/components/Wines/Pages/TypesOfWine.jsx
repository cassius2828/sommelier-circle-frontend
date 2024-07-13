import { Link } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";
import ShowBlog from "../../Blogs/ShowBlog";

const TypesOfWine = () => {
  return (
    <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-between gap-4">
      <ShowBlog propsBlogId={`6691aea098a19fabd8baa1d4`} />
      <StylesColumn />
    </div>
  );
};
export default TypesOfWine;

export const StylesColumn = () => {
  const { wineCategories } = useGlobalContext();
  return (
    <div className="border">
      <h3 className="border-b">Styles</h3>
      <ul className="flex flex-col items-start justify-start gap-12">
        {wineCategories.map((category) => {
          category.types.forEach((type) => {
            return (
              <Link to={`type.path`} key={type.name + type.path}>
                <li className="hover:bg-neutral-700">
                  <span>
                    {category} - {type.name}
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

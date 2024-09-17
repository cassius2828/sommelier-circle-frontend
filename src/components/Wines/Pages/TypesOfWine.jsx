import { useEffect } from "react";
// context
import useGlobalContext from "../../../context/global/useGlobalContext";
// services
import {
  getWinesByGrape,
  getWinesByRegion,
  getWinesByStyle,
} from "../../../services/wineService";
// components
import ShowBlog from "../../Blogs/ShowBlog";
import { AllStylesColumn } from "./AllStylesColumn";
import StylesColumn from "./StylesColumn";
import WineTable from "../WineTable";

const TypesOfWine = ({ blogId, allStyles }) => {
  const { setWinesByCategory, scrollToTop } = useGlobalContext();
  const { winesByCategory } = useGlobalContext();
  const urlIdenitfier = location.pathname.split("/")[2];
  const urlSpecificCategoryType = location.pathname.split("/")[3];

  ///////////////////////////
  // Fetch Wine By Category
  ///////////////////////////
  const fetchWineByCategory = async () => {
    if (urlIdenitfier === "regions") {
      try {
        const data = await getWinesByRegion(urlSpecificCategoryType);
        setWinesByCategory(data);
      } catch (err) {
        console.error(err);
        console.log(`Error fetching wines by the region | TypesOfWine.jsx`);
      }
    } else if (urlIdenitfier === "grapes") {
      try {
        const data = await getWinesByGrape(urlSpecificCategoryType);
        setWinesByCategory(data);
      } catch (err) {
        console.error(err);
        console.log(`Error fetching wines by the grape | TypesOfWine.jsx`);
      }
    } else {
      try {
        const data = await getWinesByStyle(urlIdenitfier);
        setWinesByCategory(data);
      } catch (err) {
        console.error(err);
        console.log(`Error fetching wines by the style | TypesOfWine.jsx`);
      }
    }
  };
  useEffect(() => {
    fetchWineByCategory();
    scrollToTop();
  }, [urlSpecificCategoryType]);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full md:w-3/4 mx-auto justify-between gap-4">
        <div>
          <ShowBlog propsBlogId={blogId} />
          <WineTable wines={winesByCategory} />
        </div>
        {allStyles ? <AllStylesColumn /> : <StylesColumn />}
      </div>{" "}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </>
  );
};
export default TypesOfWine;

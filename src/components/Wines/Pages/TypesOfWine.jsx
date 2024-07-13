/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useGlobalContext from "../../../context/global/useGlobalContext";
import ShowBlog from "../../Blogs/ShowBlog";
import { AllStylesColumn } from "./AllStylesColumn";
import StylesColumn from "./StylesColumn";
import WineTable from "../WineTable";

const TypesOfWine = ({ blogId, allStyles }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-between gap-4">
       <div>
        <ShowBlog propsBlogId={blogId} />
        <WineTable/>

       </div>
        {allStyles ? <AllStylesColumn /> : <StylesColumn />}
      </div>{" "}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </>
  );
};
export default TypesOfWine;

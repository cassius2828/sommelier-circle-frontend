import { Link } from "react-router-dom";

export const MultipleBlogsList = ({
  title,
  img,
  path,
  relativeTime,
  name,
  profileImg,
}) => {
  return (
    <Link to={path}>
      <div className="blog-container relative p-1 gap-4 border bg-zinc-700 rounded ql-snow ql-editor w-full flex items-center justify-between cursor-pointer">
        {/* date */}
        <span className="absolute text-gray-100 top-1 right-5">
          {relativeTime}
        </span>
        {/* img and name */}
        <div className="flex items-center gap-4">
          <img
            className="max-w-28 mx-auto cursor-pointer"
            src={profileImg}
            alt=""
          />
          <h3 className="text-gray-100 text-4xl">Author:{name} </h3>
        </div>
        <div className="flex items-center justify-start gap-4 w-1/2 ">
          {img && <img className="w-full mx- my-8" src={img} alt="" />}
          {/* title */}
          <h3 className=" text-4xl text-center text-gray-100 md:text-xl cursor-pointer">
            {title.length > 55 ? `${title.slice(0, 55)} ...` : title}
          </h3>
        </div>{" "}
      </div>
    </Link>
  );
};

import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

export const MultipleBlogsFull = ({
  title,
  img,
  content,
  path,
  createdAt,
  name = "anonymous",
  profileImg,
  id,
}) => {
  return (
    <>
      <div className="blog-container flex flex-col items-center relative max-h-[50rem]  p-5 ql-snow ql-editor  mx-auto my-12 pointer-events-none">
        {/* author info */}
        <div className="flex items-center gap-4 absolute text-gray-100 -top-0 left-5">
          <img className="rounded-full view-blog-img" src={profileImg} alt="" />
          <span className="text-xl">{name}</span>{" "}
        </div>

        {/* header and date */}

        <div className="mt-12">
          {img && <img className="w-full mx- my-8" src={img} alt="" />}

          <div className=" w-9/12 text-start ml-20">
            <span className=" text-gray-100 md:text-xl ">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              &mdash; Sommelier Circle Community
            </span>
          </div>
        </div>

        {/* title and content */}
        <h2 className=" text-2xl md:text-4xl text-start leading-[3rem] text-gray-100 relative top-10  w-9/12 ">
          {title.length > 60 ? `${title.slice(0, 60)}...` : title}
        </h2>
        <div
          className=" text-gray-100 md:text-xl mt-12 p-4 leading-[3rem]"
          dangerouslySetInnerHTML={{
            __html: `${DOMPurify.sanitize(content).slice(0, 150)} ...`,
          }}
        ></div>
      </div>

      {/* action btns */}
      <div className="flex items-center justify-around">
        <Link to={path}>
          <button
            type="button"
            className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            read more
          </button>
        </Link>{" "}
        <Link className="flex items-center gap-6" to={`/profiles/${id}`}>
          <button
            type="button"
            className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            view profile
          </button>
        </Link>
        <button
          onClick={() =>
            alert(
              "this will copy the link and bring you to a social platform of your choosing"
            )
          }
          type="button"
          className="text-xl md:text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
        >
          share blog
        </button>
        {/* </Link> */}
      </div>
    </>
  );
};

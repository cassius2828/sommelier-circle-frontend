import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
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
     
            <img
              className="rounded-full view-blog-img"
              src={profileImg}
              alt=""
            />
            <span className="text-xl">{name}</span>{" "}
      
        </div>

        {/* header and date */}

        <div className="mt-12">
          {img && <img className="w-full mx- my-8" src={img} alt="" />}

          <div className=" w-9/12 text-start ml-20">
            <span className=" text-gray-100 text-xl ">
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
        <h2 className=" text-4xl text-start leading-[3rem] text-gray-100 relative top-10  w-9/12 ">
          {title.length > 60 ? `${title.slice(0, 60)}...` : title}
        </h2>
        <div
          className=" text-gray-100 text-2xl mt-12 p-4 leading-[3rem]"
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
            className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
          >
            read more
          </button>
        </Link>{" "}
        <Link className="flex items-center gap-6" to={`/profiles/${id}`}>
        <button
            type="button"
            className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
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
          className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
        >
          share blog
        </button>
        {/* </Link> */}
      </div>
    </>
  );
};

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
        <span className="absolute text-gray-100 top-1 right-5">
          {relativeTime}
        </span>
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

          <h3 className=" text-4xl text-center text-gray-100 cursor-pointer">
            {title.length > 55 ? `${title.slice(0, 55)} ...` : title}
          </h3>
        </div>{" "}
      </div>
    </Link>
  );
};

export const BlogTable = ({ blogs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Profile Image</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Blog Header</th>
            <th className="py-2 px-4 border-b">Blog Title</th>
            <th className="py-2 px-4 border-b">Date Created</th>
            <th className="py-2 px-4 border-b">View Blog</th>
            <th className="py-2 px-4 border-b">Share Blog</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {blogs?.map((blog, idx) => (
            <tr key={blog.title + idx} className="hover:bg-gray-100">
              {/* author info */}
              <td className="py-2 px-4 border-b">
                <Link to={`/profiles/${blog.owner._id}`}>
                  <img
                    src={blog.owner.profileImg}
                    alt={blog.owner.username}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/profiles/${blog.owner._id}`}>
                  {blog.owner.username}
                </Link>
              </td>
              {/* header */}
              <td className="py-2 px-4 border-b">
                {blog.img && (
                  <img className="w-24 mx- my-8" src={blog.img} alt="" />
                )}
              </td>
              {/* title */}
              <td className="py-2 px-4 border-b text-center">{blog.title}</td>
              {/* date */}
              <td className="py-2 px-4 border-b text-center">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              {/* action btns */}
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/blogs/${blog._id}`}>
                  <button className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                    view
                  </button>
                </Link>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() =>
                    alert(
                      "this will copy the link and bring you to a social platform of your choosing"
                    )
                  }
                  type="button"
                  className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
                >
                  share blog
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

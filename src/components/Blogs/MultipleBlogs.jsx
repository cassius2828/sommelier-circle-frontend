import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const MultipleBlogsFull = ({ title, img, content, path }) => {
  return (
    <Link to={path}>
      <div className="blog-container p-5 border ql-snow ql-editor w-[50rem]  mx-auto">
        <div>
          <img className="max-w-96 mx-auto my-8" src={img} alt="" />
        </div>
        <h2 className=" text-5xl text-center">{title}</h2>

        <div
          className="preview test bg-gray-100 p-4  ql-editor  "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
      </div>
    </Link>
  );
};

export const MultipleBlogsList = ({ title, img, path }) => {
  return (
    <Link to={path}>
      <div className="blog-container p-1 gap-4 border bg-zinc-700 rounded ql-snow ql-editor w-[50rem] flex items-center justify-between ">
        <div>
          <img className="max-w-28 mx-auto" src={img} alt="" />
        </div>
        <h2 className=" text-5xl text-center">{title}</h2>
      </div>
    </Link>
  );
};

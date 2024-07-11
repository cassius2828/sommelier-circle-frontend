import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const MultipleBlogsFull = ({ title, img, content, path,relativeTime }) => {
    console.log(relativeTime)
  return (
    <Link to={path}>
      <div className="blog-container relative max-h-[50rem]  p-5 border ql-snow ql-editor w-[50rem]  mx-auto cursor-pointer">
       <span className="absolute text-gray-100 right-5">{relativeTime}</span>
        <div>
          <img className="max-w-96 mx-auto my-8 cursor-pointer" src={img} alt="" />
        </div>
        <h2 className=" text-5xl text-center text-gray-100">{title}</h2>

        <div
          className="preview test bg-gray-100 p-4  ql-editor  "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
      </div>
    </Link>
  );
};

export const MultipleBlogsList = ({ title, img, path,relativeTime }) => {
  return (
    <Link to={path}>
      <div className="blog-container relative p-1 gap-4 border bg-zinc-700 rounded ql-snow ql-editor w-[50rem] flex items-center justify-between cursor-pointer">
      <span className="absolute text-gray-100 top-1 right-5">{relativeTime}</span>
       
        <div>
          <img className="max-w-28 mx-auto cursor-pointer" src={img} alt="" />
        </div>
        <h2 className=" text-5xl text-center text-gray-100 cursor-pointer">{title.slice(0,25)}...</h2>
      </div>
    </Link>
  );
};

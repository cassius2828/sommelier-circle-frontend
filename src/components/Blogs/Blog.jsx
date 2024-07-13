import DOMPurify from "dompurify";
import SocialIcons from "../Icons/Social-Icons";
import { useState } from "react";
import EditOrDeleteModal from "../Modals/EditOrDelete";
import useAuthContext from "../../context/auth/useAuthContext";

/* eslint-disable react/prop-types */
const Blog = ({ title, img, content, createdAt, id, name, profileImg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const hanldeBlogNav = () => {
    console.log("nav");
  };
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <EditOrDeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        subject={"blog"}
      />
      <div className="flex items-center gap-4  w-8/12 relative z-50  mx-auto text-gray-100 mt-20">
        <img className="rounded-full view-blog-img " src={profileImg} alt="" />
        <span className="text-2xl">{name}</span>{" "}
      </div>
      <div className="blog-container relative p-5  ql-snow ql-editor w-full max-w-[90rem]  mx-auto mb-24">
        {user._id.toString() === id && (
          <div
            onClick={handleToggleModal}
            className="text-right text-gray-100 text-6xl relative -top-12  cursor-pointer"
          >
            ...
          </div>
        )}

        <div className="flex gap-4 relative">
          <h2 className=" text-5xl text-center text-gray-100">{title}</h2>
          <span className="text-xl absolute right-0 -top-12 text-gray-100">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        {img && <img className="w-full mx- my-8" src={img} alt="" />}

        <div
          className="preview test bg-gray-100 p-4  ql-editor  "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
        <div className="share-container relative">
          <span className="text-2xl text-gray-100 absolute -top-16 left-1/2 -translate-x-1/2 ">
            Share this blog with others!
          </span>
          <SocialIcons />
        </div>
        <div className="blog-navigation flex items-center justify-between">
          <div className="prev-blog">
            {" "}
            <button
              onClick={hanldeBlogNav}
              type="button"
              className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              previous blog
            </button>
          </div>
          <div className="next-blog">
            {" "}
            <button
              onClick={hanldeBlogNav}
              type="button"
              className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              next blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;

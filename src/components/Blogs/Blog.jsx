import DOMPurify from "dompurify";
import SocialIcons from "../Icons/Social-Icons";
import { useEffect, useState } from "react";
import EditOrDeleteModal from "../Modals/EditOrDelete";
import useAuthContext from "../../context/auth/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import { UilStar } from "@iconscout/react-unicons";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";
import Alert, { FixedAlert } from "../CommonComponents/Alert";
import useBlogContext from "../../context/blog/useBlogContext";
/* eslint-disable react/prop-types */
const Blog = ({
  title,
  img,
  content,
  createdAt,
  ownerId,
  name,
  profileImg,
  blogId,
  blogIdList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const [isCopiedMessage, setIsCopiedMessage] = useState("");
  const { handleAddToFavorites, favoritesMessage, setFavoritesMessage } =
    useGlobalContext();
  const navigate = useNavigate();
  const totalBlogsLength = blogIdList.length;
  const currentBlogIdx = blogIdList.indexOf(blogId);

  const hanldeBlogNav = (direction) => {
    if (direction === "prev") {
      if (currentBlogIdx > 1) {
        // go back one blog
        navigate(`/blogs/${blogIdList[currentBlogIdx - 1]}`);
      } else {
        // circle back to opposite end of blogs
        navigate(`/blogs/${blogIdList[totalBlogsLength - 1]}`);
      }
    } else {
      if (currentBlogIdx < totalBlogsLength - 2) {
        // go forward one blog
        navigate(`/blogs/${blogIdList[currentBlogIdx + 1]}`);
      } else {
        navigate(`/blogs/${blogIdList[0]}`);
        // go to beginning of blog list
      }
    }
  };
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const url = encodeURI(window.location.href);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url); // Copy the URL to clipboard
      setIsCopiedMessage("Copied Link");
      console.log(url);
      // Set a timeout to clear the message after 500ms
      setTimeout(() => setIsCopiedMessage(""), 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  useEffect(() => {
    console.log(blogIdList, " final level blogidlist show");
  }, []);
  return (
    <>
      <EditOrDeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        subject={"blog"}
      />
      <div className="flex items-center gap-4  w-8/12 relative z-50  mx-auto text-gray-100 mt-20">
        {/* hides admin photo and name for blogs that are a part of the encyclopedia */}
        {user._id.toString() !== "669190f598a19fabd8baa1a4" && (
          <>
            <Link
              className="flex items-center gap-4"
              to={`/profiles/${ownerId}`}
            >
              <img
                className="rounded-full view-blog-img "
                src={profileImg}
                alt=""
              />
              <span className="text-2xl">{name}</span>{" "}
            </Link>
          </>
        )}
      </div>
      <div className="blog-container relative p-5  ql-snow ql-editor w-full max-w-[90rem]  mx-auto mb-24">
        {user._id.toString() === ownerId && (
          <div
            onClick={handleToggleModal}
            className="text-right text-gray-100 text-6xl relative -top-12  cursor-pointer"
          >
            ...
          </div>
        )}
        {/* blog info */}
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
          {/* share container */}
          <span className="text-2xl text-gray-100 absolute -top-16 left-1/2 -translate-x-1/2 ">
            Share this blog with others!
          </span>
          <div className="mt-24 mb-12">
            <SocialIcons mediaType="blogs" blogAuthor={name} title={title} />
          </div>
          {/* copy link */}
          <div
            onClick={handleCopyLink}
            className="border border-gray-700 w-48 mb-12 mx-auto text-gray-100 text-xl p-3 text-center rounded-md hover:bg-gray-700  transition-colors duration-200 cursor-pointer"
          >
            copy link
          </div>
          {/* favorite */}
          <div className="flex items-center gap-8 mb-12 justify-center">
            <button
              onClick={() => handleAddToFavorites(user._id, blogId, "blogs")}
              className="p-2 border-2 border-[#FFD700] rounded-lg"
            >
              <UilStar size="24" color="#FFD700" />
            </button>
            <span className="text-gray-100 text-2xl">Add to Favorites</span>
          </div>
          {isCopiedMessage && <FixedAlert success message={"Copied Link"} />}
        </div>
        {/* blog nav btns */}
        <div className="blog-navigation flex items-center justify-between">
          <div className="prev-blog">
            <button
              onClick={() => hanldeBlogNav("prev")}
              type="button"
              className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              previous blog
            </button>
          </div>
          <div className="next-blog">
            {" "}
            <button
              onClick={() => hanldeBlogNav("next")}
              type="button"
              className="text-3xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              next blog
            </button>
          </div>
        </div>

        {favoritesMessage && (
          <AddedToFavoritesModal
            message={favoritesMessage}
            setMessage={setFavoritesMessage}
          />
        )}
      </div>
    </>
  );
};
export default Blog;

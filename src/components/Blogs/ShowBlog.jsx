import DOMPurify from "dompurify";
import Blog from "./Blog";
import { getBlog } from "../../services/blogService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import useBlogContext from "../../context/blog/useBlogContext";

/* eslint-disable react/prop-types */
const ShowBlog = ({ propsBlogId }) => {
  const { blogId } = useParams();
  const { isLoading, setIsLoading } = useGlobalContext();
  const { communityBlogs, fetchCommunityBlogIds, showBlog, setShowBlog } =
    useBlogContext();


  

  return (
    <div className="blog-container p-5 pt-12 mt-52 md:mt-80  ql-snow ql-editor w-full mx-auto">
      <Blog
    propsBlogId={propsBlogId}
      />
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </div>
  );
};
export default ShowBlog;

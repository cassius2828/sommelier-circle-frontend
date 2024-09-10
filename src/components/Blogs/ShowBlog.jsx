import DOMPurify from "dompurify";
import Blog from "./Blog";
import { getBlog } from "../../services/blogService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";

/* eslint-disable react/prop-types */
const ShowBlog = ({ propsBlogId }) => {
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();
  const { isLoading, setIsLoading } = useGlobalContext();
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        // this allows me to enter in props for the id if needed
        const blogData = await getBlog(propsBlogId ? propsBlogId : blogId);
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
    fetchBlog();
  }, [blogId, propsBlogId]);

  if (isLoading) return <Loader />;

  return (
    <div className="blog-container p-5 mt-80  ql-snow ql-editor w-full mx-auto">
      <Blog
        title={blog?.title}
        img={blog?.img}
        content={blog?.content}
        createdAt={blog?.createdAt}
        ownerId={blog?.owner._id}
        name={blog?.owner.username}
        profileImg={blog?.owner.profileImg}
        blogId={blog?._id}
      />
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </div>
  );
};
export default ShowBlog;

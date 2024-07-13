import DOMPurify from "dompurify";
import Blog from "./Blog";
import { getBlog } from "../../services/blogService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const ShowBlog = ({propsBlogId}) => {
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // this allows me to enter in props for the id if needed
        const blogData = await getBlog(propsBlogId ? propsBlogId : blogId);
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      }
    };
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
    fetchBlog();
  }, [blogId]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-container p-5 mt-80  ql-snow ql-editor w-full mx-auto">
      <Blog
        title={blog?.title}
        img={blog?.img}
        content={blog?.content}
        createdAt={blog.createdAt}
        id={blog.owner._id}
        name={blog.owner.username}
        profileImg={blog.owner.profileImg}
      />
    </div>
  );
};
export default ShowBlog;

import DOMPurify from "dompurify";
import Blog from "./Blog";
import { getBlog } from "../../services/blogService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const ShowBlog = () => {
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlog(blogId);
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching the blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <div>Loading...</div>;
  console.log(blog)
  return (
    <div className="blog-container p-5  ql-snow ql-editor w-[50rem]  mx-auto">
      <Blog title={blog?.title} img={blog?.img} content={blog?.content} relativeTime={blog.relativeTime} />
    </div>
  );
};
export default ShowBlog;

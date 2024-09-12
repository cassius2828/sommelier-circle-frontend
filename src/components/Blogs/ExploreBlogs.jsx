import { useState, useEffect } from "react";
import useBlogContext from "../../context/blog/useBlogContext";
import Blog from "./Blog";
import {
  BlogTable,
  MultipleBlogsFull,
  MultipleBlogsList,
} from "./MultipleBlogs";
import { useParams } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import DisplayBlogs from "./DisplayBlogs";

const ExploreBlogs = () => {
  const { blogs, fetchAllBlogs } = useBlogContext();
  const { scrollToTop, isLoading } = useGlobalContext();
  const [display, setDisplay] = useState("full");

  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };

  // fetch blogs on render
  useEffect(() => {
    fetchAllBlogs();
    console.log(blogs, ' <-- explore blogs')
    scrollToTop();
  }, []);

  if (isLoading) return <Loader />;

  console.log(blogs);
  return (
    <DisplayBlogs
      title="Explore Blogs"
      display={display}
      handleDisplayChange={handleDisplayChange}
      blogs={blogs}
    />
  );
};

export default ExploreBlogs;

/*
    <ul className="flex flex-wrap gap-4 w-full lg:w-[80vw] mx-auto justify-around">
          {blogs?.map((blog, idx) => (
            <li key={blog.title + idx}>
              {display === "full" ? (
                <MultipleBlogsFull
                  path={`/blogs/${blog._id}`}
                  title={blog.title}
                  img={blog.img}
                  content={blog.content}
                  relativeTime={blog.relativeTime}
                />
              ) : (
                <MultipleBlogsList
                  path={`/blogs/${blog._id}`}
                  title={blog.title}
                  img={blog.img}
                  relativeTime={blog.relativeTime}
                />
              )}
            </li>
          ))}
        </ul>

*/

import { useState, useEffect } from "react";
import useBlogContext from "../../context/blog/useBlogContext";
import Blog from "./Blog";
import { MultipleBlogsFull, MultipleBlogsList } from "./MultipleBlogs";
import { useParams } from "react-router-dom";

const MyBlogs = () => {
  const { myBlogs, setMyBlogs, fetchCurrentUserBlogs } = useBlogContext();
  const [display, setDisplay] = useState("full");
  const {userId} = useParams()
console.log(userId)
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };
  useEffect(() => {
    fetchCurrentUserBlogs();
  }, [userId]);


  return (
    <div className="flex flex-col items-center gap-12 my-12">
      <div className="flex gap-4 items-center">
        <label htmlFor="blog-display">Display blogs</label>
        <select
          className="text-gray-800 px-4 py-2 rounded-sm"
          name="blog-display"
          id="blog-display"
          value={display}
          onChange={handleDisplayChange}
        >
          <option value="full">Full</option>
          <option value="list">List</option>
        </select>
      </div>
      <ul className="flex flex-wrap gap-4 w-full lg:w-[80vw] mx-auto justify-around">
        {myBlogs?.map((blog, idx) => (
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
    </div>
  );
};

export default MyBlogs;

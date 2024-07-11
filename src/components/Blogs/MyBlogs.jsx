import { useState, useEffect } from "react";
import useBlogContext from "../../context/blog/useBlogContext";
import Blog from "./Blog";
import {
  BlogTable,
  MultipleBlogsFull,
  MultipleBlogsList,
} from "./MultipleBlogs";
import { useParams } from "react-router-dom";

const MyBlogs = () => {
  const { myBlogs, setMyBlogs, fetchCurrentUserBlogs } = useBlogContext();
  const [display, setDisplay] = useState("full");
  const { userId } = useParams();
  console.log(userId);
  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);
  };
  useEffect(() => {
    fetchCurrentUserBlogs();
  }, [userId]);

  return (
  
<>
  <h1 className="text-gray-100 text-6xl text-center my-24">
    My Blogs
  </h1>
  <div className="flex flex-col items-center gap-12 my-12">
    <div className="flex gap-4 items-center">
      <label className="text-gray-100" htmlFor="blog-display">
        Display blogs
      </label>
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

    {display === "full" ? (
      <ul
        className={`${
          myBlogs.length < 3 ? "flex justify-around items-center lg:w-[50vw] gap-20" : "grid grid-cols-1  lg:grid-cols-3"
        } gap-12 w-full lg:w-[80vw] mx-auto pl-20`}
      >
        {myBlogs?.map((blog, idx) => (
          <li key={blog.title + idx}>
            <MultipleBlogsFull
              path={`/blogs/${blog._id}`}
              title={blog.title}
              img={blog.img}
              content={blog.content}
              name={blog.owner.username}
              profileImg={blog.owner.profileImg}
              createdAt={blog.createdAt}
            />
          </li>
        ))}
      </ul>
    ) : (
      <BlogTable blogs={myBlogs} />
    )}
  </div>
</>

  );
};

export default MyBlogs;

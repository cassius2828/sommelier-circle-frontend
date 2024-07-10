import { useEffect } from "react";
import useBlogContext from "../../context/blog/useBlogContext";
import Blog from "./Blog";

const MyBlogs = () => {
  const { myBlogs, setMyBlogs } = useBlogContext();
  console.log(myBlogs);
  return (
    <div>
      {myBlogs?.map((blog, idx) => {
        return (
          <Blog
            key={blog.title + idx}
            title={blog.title}
            img={blog.img}
            content={blog.content}
          />
        );
      })}
    </div>
  );
};
export default MyBlogs;

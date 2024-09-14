import { BlogTable, MultipleBlogsFull } from "./MultipleBlogs";

const DisplayBlogs = ({ display, handleDisplayChange, blogs, title }) => {
  return (
    <>
      {/* overlay bg */}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>

      <h1 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-24">
        {title}
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
            className={` grid grid-cols-1  lg:grid-cols-3
         gap-12 w-full lg:w-[80vw] mx-auto`}
          >
            {blogs?.map((blog, idx) => (
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
          <BlogTable blogs={blogs} />
        )}
      </div>
    </>
  );
};
export default DisplayBlogs;

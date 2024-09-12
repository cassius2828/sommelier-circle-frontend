/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import useBlogContext from "../../context/blog/useBlogContext";
const LandingBlogs = () => {
  const { landingBlogs } = useBlogContext();
  console.log(landingBlogs, " <-- landing blogs");
  return (
    <>
      <h2 className="text-6xl text-gray-100 text-center mb-32 my-48">
        Explore Our Community Blogs
      </h2>
      <div className="flex flex-col md:hidden items-center justify-center gap-12 mx-3">
        {landingBlogs.map((blog, idx) => {
          if (idx % 2 === 0) {
            return <BlogHorz key={idx + blog?._id} blog={blog} imgRight />;
          } else {
            return <BlogHorz key={idx + blog?._id} blog={blog} />;
          }
        })}
      </div>
      <div className="hidden md:grid  grid-cols-2  2xl:grid-cols-4 ml-20 gap-12 my-24">
        {/* col 1 */}
        <Col1 landingBlogs={landingBlogs} />
        {/* col 2 */}
        <Col2 landingBlogs={landingBlogs} />
        {/* col 3 */}
        <Col3 landingBlogs={landingBlogs} />
        {/* col 4 */}
        <Col4 landingBlogs={landingBlogs} />
      </div>
    </>
  );
};
export default LandingBlogs;

export const Col1 = ({ landingBlogs }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      {/* blog 1 */}
      <BlogFullSq blog={landingBlogs[0]} />
      {/* blog 2 */}
      <BlogFullSq blog={landingBlogs[1]} />
    </div>
  );
};
export const Col2 = ({ landingBlogs }) => {
  return <BlogTall blog={landingBlogs[2]} />;
};
export const Col3 = ({ landingBlogs }) => {
  return (
    <div className="flex-col flex items-center justify-between gap-4 ">
      {/* row 1 */}
      <BlogHorz blog={landingBlogs[3]} />
      {/* row 2 */}
      <div className="flex items-center justify-between gap-4 ">
        {/* blog 1 */}
        <BlogFullSq blog={landingBlogs[5]} size="sm" />

        {/* blog 2 */}
        <BlogFullSq blog={landingBlogs[7]} size="sm" />
      </div>
      {/* row 3 */}
      <BlogHorz blog={landingBlogs[6]} imgRight={true} />
    </div>
  );
};
export const Col4 = ({ landingBlogs }) => {
  return <BlogTall blog={landingBlogs[4]} />;
};

///////////////////////////
// Blog Full Square
///////////////////////////
export const BlogFullSq = ({ size, blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full "
    >
      <div className="hover:brightness-50 transition-all duration-200 ease-in-out">
        <img
          className="rounded-lg max-h-96 overflow-hidden"
          src={blog?.img}
          alt={blog?.title}
        />
      </div>

      {/* overlay 1 | 80% opacity */}
      <div
        className={`absolute h-full w-full top-0 left-0 z-10 bg-black transition-all duration-200 ease-in-out ${
          isHovered ? " opacity-80" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/* overlay 1 | 100% opacity, bg-transparent */}

      <div
        className={`absolute h-full w-full top-0 left-0 z-10 bg-transparent transition-all duration-200 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to={`/blogs/${blog?._id}`}>
          <h3
            className={`absolute text-gray-100 ${
              size === "sm" ? "text-xl" : "text-3xl"
            } top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center`}
          >
            {size === 'sm' ? blog?.title.slice(0,35) + '...' : blog?.title}
          </h3>
          <button
            className={`border absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 ${
              size === "sm" ? "text-xl" : "text-3xl"
            } text-gray-100 bg-slate-600 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white`}
          >
            read blog
          </button>
        </Link>
      </div>
    </div>
  );
};

///////////////////////////
// Blog Tall
///////////////////////////
export const BlogTall = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center justify-start bg-neutral-900 text-gray-100 rounded-lg overflow-hidden relative h-full"
    >
      <img src={blog?.img} alt={blog?.title} />
      <h3 className="text-3xl mt-12 text-center">{blog?.title}</h3>
 
      {/* overlay 1 | 80% opacity */}
      <div
        className={`absolute h-full w-full top-0 left-0 z-10 bg-black transition-all duration-200 ease-in-out ${
          isHovered ? " opacity-80" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/* overlay 1 | 100% opacity, bg-transparent */}

      <div
        className={`absolute h-full w-full top-0 left-0 z-10 bg-transparent transition-all duration-200 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to={`/blogs/${blog?._id}`}>
          <button className="border absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 text-3xl text-gray-100 bg-slate-600 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
            read blog
          </button>
        </Link>
      </div>
    </div>
  );
};
///////////////////////////
// Blog Horizontal
///////////////////////////
export const BlogHorz = ({ imgRight, blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex ${
        imgRight ? "flex-row-reverse" : ""
      } items-center justify-between gap-4  relative h-full bg-neutral-900 text-gray-100 rounded-lg overflow-hidden `}
    >
      <img
        className="w-1/2 h-full object-cover"
        src={blog?.img}
        alt={blog?.title}
      />
      <div className="text-center">
        <h3 className="text-3xl ">{blog?.title}</h3>
      
      </div>
      {/* overlay 1 | 80% opacity */}
      <div
        className={`absolute h-full w-full top-0 left-0 z-10 bg-black transition-all duration-200 ease-in-out ${
          isHovered ? " opacity-80" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/* overlay 1 | 100% opacity, bg-transparent */}

      <div
        className={`absolute h-full w-full top-0 left-0 z-10 bg-transparent transition-all duration-200 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to={`/blogs/${blog?._id}`}>
          <button
            className={`border lg:min-w-60 absolute top-1/2 ${
              imgRight ? "left-3/4" : "left-1/4"
            } -translate-x-1/2 -translate-y-1/2 px-6 py-2 text-3xl text-gray-100 bg-slate-600 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white`}
          >
            read blog
          </button>
        </Link>
      </div>
    </div>
  );
};

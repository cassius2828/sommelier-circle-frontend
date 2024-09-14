import { useState } from "react";
import { Link } from "react-router-dom";

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
            className="md:rounded-lg max-h-[50rem] overflow-hidden"
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
                size === "sm" ? "text-lg md:text-xl" : "text-xl md:text-3xl"
              } text-gray-100 bg-slate-600 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white`}
            >
              read blog
            </button>
          </Link>
        </div>
      </div>
    );
  };
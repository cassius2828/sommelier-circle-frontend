import { useState } from "react";
import { Link } from "react-router-dom";

export const BlogTall = ({ blog }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col items-center justify-start bg-neutral-900 text-gray-100 md:rounded-lg overflow-hidden relative h-full"
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
            <button className="border absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 text-xl md:text-3xl text-gray-100 bg-slate-600 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              read blog
            </button>
          </Link>
        </div>
      </div>
    );
  };
  
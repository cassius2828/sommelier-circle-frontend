/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const LandingBlogs = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <h2 className="text-6xl text-gray-100 text-center mb-32 my-48">
        Explore Our Community Blogs
      </h2>
      <div className="flex flex-col md:hidden items-center justify-center gap-12 mx-3">
        <BlogHorz />
        <BlogHorz imgRight />
        <BlogHorz />
        <BlogHorz imgRight />
        <BlogHorz />
        <BlogHorz imgRight />
        <BlogHorz />
        <BlogHorz imgRight />
      </div>
      <div className="hidden md:grid  grid-cols-2  2xl:grid-cols-4 ml-20 gap-12 my-24">
        {/* col 1 */}
        <Col1 />
        {/* col 2 */}
        <Col2 />
        {/* col 3 */}
        <Col3 />
        {/* col 4 */}
        <Col4 />
      </div>
    </>
  );
};
export default LandingBlogs;

export const Col1 = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      {/* blog 1 */}
      <BlogFullSq />
      {/* blog 2 */}
      <BlogFullSq />
    </div>
  );
};
export const Col2 = () => {
  return <BlogTall />;
};
export const Col3 = () => {
  return (
    <div className="flex-col flex items-center justify-between gap-4 ">
      {/* row 1 */}
      <BlogHorz />
      {/* row 2 */}
      <div className="flex items-center justify-between gap-4 ">
        {/* blog 1 */}
        <BlogFullSq size="sm" />

        {/* blog 2 */}
        <BlogFullSq size="sm" />
      </div>
      {/* row 3 */}
      <BlogHorz imgRight={true} />
    </div>
  );
};
export const Col4 = () => {
  return <BlogTall />;
};

export const BlogFullSq = ({ img, title, size, path }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full "
    >
      <div className="hover:brightness-50 transition-all duration-200 ease-in-out">
        <img
          className="rounded-lg overflow-hidden"
          src="https://blogs.sas.com/content/efs/files/2015/11/mazzocco-wine.jpg"
          alt=""
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
        <Link to={path}>
          <h3
            className={`absolute text-gray-100 ${
              size === "sm" ? "text-2xl" : "text-3xl"
            } top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2`}
          >
            title
          </h3>
          <button
            className={`border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 ${
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

export const BlogTall = ({ img, title, path }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center justify-start bg-neutral-900 text-gray-100 rounded-lg overflow-hidden relative h-full"
    >
      <img
        src="https://blogs.sas.com/content/efs/files/2015/11/mazzocco-wine.jpg"
        alt=""
      />
      <h3 className="text-3xl mt-12">title</h3>
      <p className="p-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
        laboriosam assumenda quae, reprehenderit dolore odio atque. Numquam,
        doloremque deleniti. Aliquam aperiam nulla saepe consectetur unde
        adipisci molestias tenetur minus quibusdam! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Nemo at ipsa error hic reiciendis nesciunt
        distinctio unde architecto suscipit nisi minus ullam, consequuntur vitae
        placeat laudantium fugit voluptatibus ex aperiam. Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Numquam quibusdam suscipit odio hic
        deserunt tempore architecto molestiae, excepturi nostrum aspernatur
        similique eum magni itaque, corporis voluptatibus, cumque nisi quasi.
        Autem!
      </p>
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
        <Link to={path}>
          <button className="border absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 text-3xl text-gray-100 bg-slate-600 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
            read blog
          </button>
        </Link>
      </div>
    </div>
  );
};

export const BlogHorz = ({ imgRight, img, title, path }) => {
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
        src="https://blogs.sas.com/content/efs/files/2015/11/mazzocco-wine.jpg"
        alt=""
      />
      <div className="text-center">
        <h3 className="text-3xl ">title</h3>
        <p className="text-xl ">
          {" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
          laboriosam assumenda quae, reprehenderit dolore odio atque. Numquam,
          doloremque deleniti. Aliquam
        </p>
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
        <Link to={path}>
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

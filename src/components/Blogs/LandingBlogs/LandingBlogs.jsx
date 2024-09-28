import useBlogContext from "../../../context/blog/useBlogContext";
// components
import { BlogTall } from "./BlogTall";
import { BlogFullSq } from "./BlogFullSquare";
import { BlogHorz } from "./BlogHorz";


const LandingBlogs = () => {
  const { landingBlogs } = useBlogContext();
  return (
    <>
      <h2 className="text-6xl text-gray-100 text-center mb-32 my-48">
        Explore Our Community Blogs
      </h2>
      <div className="flex flex-col md:hidden items-center justify-center md:gap-12 md:mx-3">
        {landingBlogs?.map((blog, idx) => {
          // set img side to right for every other blog 
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

///////////////////////////
// Col 1
///////////////////////////
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
///////////////////////////
// Col 2
///////////////////////////
export const Col2 = ({ landingBlogs }) => {
  return <BlogTall blog={landingBlogs[2]} />;
};

///////////////////////////
// Col 3
///////////////////////////
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

///////////////////////////
// Col 4
///////////////////////////
export const Col4 = ({ landingBlogs }) => {
  return <BlogTall blog={landingBlogs[4]} />;
};


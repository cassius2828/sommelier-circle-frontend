import Blog from "./Blog";

const ShowBlog = ({ propsBlogId }) => {
  return (
    <div className="blog-container p-5 pt-12 mt-52 md:mt-80  ql-snow ql-editor w-full mx-auto">
      <Blog propsBlogId={propsBlogId} />
      {/* overlay */}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </div>
  );
};
export default ShowBlog;

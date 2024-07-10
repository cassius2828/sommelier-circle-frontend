import DOMPurify from "dompurify";

/* eslint-disable react/prop-types */
const Blog = ({ title, img, content }) => {
  return (
    <div className="blog-container p-5 border ql-snow ql-editor">
      <div>
        <img className="max-w-96 mx-auto" src={img} alt="" />
      </div>
      <h2 className="mt-4">{title}</h2>

      <div
        className="preview test bg-gray-100 p-4 rounded-lg ql-editor "
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      ></div>
    </div>
  );
};
export default Blog;

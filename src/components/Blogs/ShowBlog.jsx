import DOMPurify from "dompurify";

/* eslint-disable react/prop-types */
const LandingBlogGallery = ({ title, img, content }) => {
  return (
    <div className="blog-container p-5 border ql-snow ql-editor w-[50rem]  mx-auto">
      <div>
        <img className="max-w-96 mx-auto my-8" src={img} alt="" />
      </div>
      <h2 className=" text-5xl text-center">{title}</h2>

      <div
        className="preview test bg-gray-100 p-4  ql-editor  "
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      ></div>
    </div>
  );
};
export default LandingBlogGallery;

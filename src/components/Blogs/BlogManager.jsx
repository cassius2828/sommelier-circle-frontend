/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBlog,
  getBlog,
  updateBlogNoImg,
  updateBlogWithImg,
} from "../../services/blogService";
import DOMPurify from "dompurify";
import useAuthContext from "../../context/auth/useAuthContext";

const MyEditor = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [editorState, setEditorState] = useState("");
  const navigate = useNavigate();
  const { blogId } = useParams();
  useEffect(() => {
    console.log(img);
  }, [img]);
  //   check to see if we are trying to edit the blog,
  //  then set the editorState with the content from that blog
  useEffect(() => {
    if (blogId) {
      const fetchExistingBlog = async () => {
        try {
          const existingBlogData = await getBlog(blogId);
          setTitle(existingBlogData.title);
          setImg(null);
          setEditorState(existingBlogData.content);
        } catch (err) {
          console.error(err);
          console.log("Cannot find existing blog");
        }
      };
      fetchExistingBlog();
    }
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // edit existing form
    if (img === null && blogId) {
      const formData = {
        title,
        content: editorState,
      };
      try {
        await updateBlogNoImg(formData, blogId);
        navigate(`/blogs/user-blogs/${user._id}`);
      } catch (err) {
        console.error(err);
        console.log(`Could not update blog post | (no photo updates)`);
      }
    } else if (img && blogId) {
      const dataToSendToServer = new FormData();
      dataToSendToServer.append("img", img);
      dataToSendToServer.append("title", title);
      dataToSendToServer.append("content", editorState);
      try {
        await updateBlogWithImg(dataToSendToServer, blogId);
        navigate(`/blogs/user-blogs/${user._id}`);
      } catch (err) {
        console.error(err);
        console.log(`Could not update blog post | (YES photo update)`);
      }
    } else {
      // create new form
      const dataToSendToServer = new FormData();
      dataToSendToServer.append("owner", user._id);
      dataToSendToServer.append("img", img);
      dataToSendToServer.append("title", title);
      dataToSendToServer.append("content", editorState);
      try {
        await createBlog(dataToSendToServer);
        navigate(`/blogs/user-blogs/${user._id}`);
      } catch (err) {
        console.error(err);
        console.log(`Could not create blog post`);
      }
    }
  };

  const handleFileChange = (e) => {
    const { target } = e;
    setImg(target.files[0]);
    setImgPreview(URL.createObjectURL(target.files[0]));
  };
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ direction: "rtl" }],
    ],
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "direction",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-[160rem] mx-auto mt-80">
      <div className="w-full min-h-[75svh] flex flex-col justify-between lg:w-1/2 bg-neutral-900 text-gray-300 rounded-lg shadow-md p-4">
        <div className=" ">
          <label className="text-4xl capitalize " htmlFor="title">
            blog title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            className="w-full  bg-[#111213] text-gray-300 rounded-lg shadow-md p-4 my-8"
            type="text"
          />
          <label className="text-4xl capitalize " htmlFor="img">
            header image
          </label>
          <input
            onChange={handleFileChange}
            name="img"
            id="img"
            className="w-full  bg-[#111213] text-gray-300 rounded-lg shadow-md p-4 my-8"
            type="file"
          />
          <label className="text-4xl capitalize">Blog content</label>
          <ReactQuill
            className="my-8"
            theme="snow"
            value={editorState}
            onChange={setEditorState}
            modules={modules}
            formats={formats}
          />{" "}
        </div>
        {blogId ? (
          <div className="w-full flex gap-4">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="mt-4 w-full bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>{" "}
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="mt-4 w-full bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Update
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="mt-4 bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Create
          </button>
        )}
      </div>
      <div className="w-full min-h-[75svh] lg:w-1/2 bg-neutral-900 text-gray-300 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div className="ql-snow">
          {/* header and date */}
          <div className="mt-12">
            <img
              className="max-w-96 mx-auto my-8 cursor-pointer"
              src={imgPreview}
              alt=""
            />
            <div className=" w-9/12 text-start ml-20 mt-12">
              <span className=" text-gray-100 text-xl ">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                &mdash; Sommelier Circle Community
              </span>
            </div>
          </div>
          <div className="text-center w-full my-12">
            <span className="text-4xl ">{title}</span>
          </div>
          <div
            // must add ql-editor class to parent for the styles to properly load
            className="preview ql-editor bg-[#111213] p-4 rounded-lg"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(editorState, {
                ADD_ATTR: ["style", "class"],
              }),
            }}
            //   dangerouslySetInnerHTML={{ __html: editorState }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MyEditor;

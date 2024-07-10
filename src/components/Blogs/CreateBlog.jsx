/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../services/blogService";

const MyEditor = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [editorState, setEditorState] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSendToServer = new FormData();
    dataToSendToServer.append("img", img);
    dataToSendToServer.append("title", title);
    dataToSendToServer.append("content", editorState);
    try {
      await createBlog(dataToSendToServer);
      navigate("/blogs/my-blogs");
    } catch (err) {
      console.error(err);
      console.log(`Could not create blog post`);
    }
  };

  const handleFileChange = (e) => {
    const { target } = e;
    setImg(target.files[0]);
  };

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
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full h-[75svh] flex flex-col justify-between lg:w-1/2 bg-gray-200 text-gray-800 rounded-lg shadow-md p-4">
        <div className=" ">
          <label className="text-4xl capitalize " htmlFor="title">
            blog title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            className="w-full  bg-gray-100 text-gray-800 rounded-lg shadow-md p-4 my-8"
            type="text"
          />
          <label className="text-4xl capitalize " htmlFor="img">
            header image
          </label>
          <input
            onChange={handleFileChange}
            name="img"
            id="img"
            className="w-full  bg-gray-100 text-gray-800 rounded-lg shadow-md p-4 my-8"
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
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="mt-4 bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          Save
        </button>
      </div>
      <div className="w-full h-[75svh] lg:w-1/2 bg-gray-200 text-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div
          className="preview bg-gray-100 p-4 rounded-lg"
          dangerouslySetInnerHTML={{ __html: editorState }}
        ></div>
      </div>
    </div>
  );
};

export default MyEditor;

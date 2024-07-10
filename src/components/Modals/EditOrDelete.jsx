/* eslint-disable react/prop-types */
// src/components/BlogModal.jsx
import React, { useState } from "react";
import { deleteBlog } from "../../services/blogService";
import { useParams } from "react-router-dom";

const EditOrDeleteModal = ({
  isOpen,
  setIsOpen,
  onEdit,
  onDelete,
  subject,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { blogId } = useParams();
  if (!isOpen) return null;
  const showDeleteModal = () => {
    setShowConfirmDelete(true);
  };
  const handleDelete = async () => {
    try {
      await deleteBlog(blogId);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancel = () => {
    setShowConfirmDelete(false);
  };
  return (
    <>
      {" "}
      {showConfirmDelete ? (
        <ConfirmDeleteModal
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-700 w-[80vw] lg:w-96 h-60 p-6 relative rounded-lg shadow-lg flex flex-col items-center justify-between gap-12">
            <span
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-0 text-xl cursor-pointer"
            >
              x
            </span>{" "}
            <h2 className="text-2xl mb-4">Blog Actions</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                onClick={onEdit}
              >
                Edit {subject}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                onClick={showDeleteModal}
              >
                Delete {subject}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditOrDeleteModal;

export const ConfirmDeleteModal = ({ handleDelete, handleCancel }) => {
  return (
    <div className="fixed z-20 inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-700 w-[80vw] lg:w-96 h-60  p-6 rounded-lg shadow-lg flex flex-col items-center justify-between gap-12">
        <h2 className="text-2xl mb-4 capitalize text-center">
          are you sure you want to delete this blog?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-700 transition duration-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

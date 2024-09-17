const AddedToFavoritesModal = ({ message, setMessage }) => {

  const handleClose = () => {
    setMessage("");
  };
  return (
    <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fadeInQuick">
      <div className="bg-slate-700 w-[80vw] lg:w-96 h-60 p-6 relative rounded-lg shadow-lg flex flex-col items-center justify-between gap-12">
        <span
          onClick={handleClose}
          className="absolute right-2 top-0 text-xl text-gray-100 cursor-pointer"
        >
          x
        </span>{" "}
        <h2
          id="modal-text"
          className="text-2xl mb-4 text-gray-100 font-serif text-center"
        >
          {message}
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddedToFavoritesModal;

import { useNavigate } from "react-router-dom";

const NoContentFound = ({ subject, message }) => {
  const navigate = useNavigate();
  return (
    <div className="pt-32 mt-40 md:mt-80 min-h-screen w-screen ">
      <h1 className="text-4xl md:text-6xl text-gray-100 text-center font-serif">
        No {subject} found
      </h1>
      <p className="text-2xl md:text-4xl text-gray-100 text-center font-serif mt-12">
        {message}
      </p>
      <div className="w-full flex justify-center mt-12">
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-24  bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          back
        </button>
      </div>
    </div>
  );
};
export default NoContentFound;

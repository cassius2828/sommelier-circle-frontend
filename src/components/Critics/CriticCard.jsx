import { Link } from "react-router-dom";

export const CriticCard = ({ name, img, id }) => {
    return (
      <div className=" p-8 flex flex-col justify-center items-center relative">
        <div className="flex flex-col items-center">
          <img
            className="w-[30rem] h-[30rem] object-cover"
            src={
              img
                ? img
                : `https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`
            }
            alt={name + ", wine critic"}
          />
          <span className="text-3xl text-center text-gray-100 my-12 capitalize">
            {name}
          </span>
        </div>
        <Link to={`/critics/${id}`}>
          <button className=" px-4 py-2 border border-gray-100 text-gray-100 text-2xl rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white capitalize">
            critic details
          </button>
        </Link>
      </div>
    );
  };
  
import { Link } from "react-router-dom";

const CriticsGallery = () => {
  return (
    <>
      <h2 className="text-gray-100 text-6xl text-center mt-48 mb-16">
        Featured Critics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
        <CriticCard />
        <CriticCard />
        <CriticCard />
      </div>
      <div className="w-full flex justify-center mt-12 mb-20">
        <button className="px-4 py-2 text-center text-3xl w-80 border border-gray-100 text-gray-100 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          view more critics
        </button>
      </div>
    </>
  );
};
export default CriticsGallery;

export const CriticCard = () => {
  return (
    <div className=" p-8 flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center">
        <img
          src="https://www.vin-x.com/thumbnails/0/4181/268/james-suckling.jpg"
          alt=""
        />
        <span className="text-3xl text-center text-gray-100 my-12 capitalize">
          name doe
        </span>
      </div>
      <Link to={`/critics/fdjhnka`}>
        <button className=" px-4 py-2 border border-gray-100 text-gray-100 text-2xl rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          critic details
        </button>
      </Link>
    </div>
  );
};

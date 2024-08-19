import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCritics } from "../../services/criticService";

const CriticsGallery = () => {
  const [critics, setCritics] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAllCritics = async () => {
    try {
      const data = await getAllCritics();
      if (data.message) {
        setMessage(data.message);
      }
      setCritics(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service function to fetch all critics`);
    }
  };

  useEffect(() => {
    fetchAllCritics();
  }, []);
  return (
    <>
      <h2 className="text-gray-100 text-6xl text-center mt-80 mb-16">
        Featured Critics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
        {critics.map((critic) => (
          <CriticCard
            key={critic._id}
            id={critic._id}
            name={critic.name}
            awards={critic.awards}
            experience={critic.experience}
          />
        ))}
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

export const CriticCard = ({ name, img, id }) => {
  return (
    <div className=" p-8 flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center">
        <img
          src={
            img
              ? img
              : `https://www.vin-x.com/thumbnails/0/4181/268/james-suckling.jpg`
          }
          alt={name + ", wine critic"}
        />
        <span className="text-3xl text-center text-gray-100 my-12 capitalize">
          {name}
        </span>
      </div>
      <Link to={`/critics/${id}`}>
        <button className=" px-4 py-2 border border-gray-100 text-gray-100 text-2xl rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          critic details
        </button>
      </Link>
    </div>
  );
};

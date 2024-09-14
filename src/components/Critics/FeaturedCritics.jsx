import { Link } from "react-router-dom";
import { CriticCard } from "./CriticCard";
import { useEffect, useState } from "react";
import { getFeaturedCritics } from "../../services/criticService";

const FeaturedCriticsGallery = () => {
  const [critics, setCritics] = useState([]);
  const [message, setMessage] = useState("");

  // fetch featured critics
  const fetchFeaturedCritics = async () => {
    try {
      const data = await getFeaturedCritics();
      if (data.message) {
        setMessage(data.message);
      }
      setCritics(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service function to fetch featured critics`);
    }
  };

  useEffect(() => {
    fetchFeaturedCritics();
  }, []);
  return (
    <>
      <h2 className="text-gray-100 text-6xl text-center mt-40 md:mt-80 mb-16">
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
            img={critic.img}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-12 mb-20">
        <Link to={`/critics`}>
          <button className="px-4 py-2 text-center text-3xl w-80 border border-gray-100 text-gray-100 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white capitalize">
            view more critics
          </button>
        </Link>
      </div>
    </>
  );
};
export default FeaturedCriticsGallery;

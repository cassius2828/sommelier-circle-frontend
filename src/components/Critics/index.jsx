import { useEffect, useState } from "react";
import { getAllCritics } from "../../services/criticService";
import { CriticCard } from "./CriticCard";
import useGlobalContext from "../../context/global/useGlobalContext";
import LoaderSpin from "../CommonComponents/LoaderSpin";

const CriticsGallery = () => {
  const [critics, setCritics] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  // context
  const { totalCritics } = useGlobalContext();

  ///////////////////////////
  // Handle Load More Critics
  ///////////////////////////
  const handleLoadMoreCritics = () => {
    setPage((prev) => prev + 1);
    fetchNextPageOfCritics(page + 1);
  };
  const fetchNextPageOfCritics = async (page) => {
    try {
      const data = await getAllCritics(page);
      if (data.message) {
        setMessage(data.message);
      }
      setCritics((prev) => [...prev, ...data]);
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service function to fetch all critics`);
    }
  };

  ///////////////////////////
  // fetch all critics
  ///////////////////////////
  const fetchAllCritics = async () => {
    try {
      const data = await getAllCritics(page);
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
    fetchAllCritics(page);
  }, []);
  return (
    <>
      <h2 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-16">
        Showing <span className="text-theme-sand-dark">{critics.length || <LoaderSpin/>}</span>{" "}
        of <span className="text-theme-sand-dark">{totalCritics}</span> Critics
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
      {critics.length < totalCritics && (
        <div className="w-full flex justify-center mt-12 mb-20">
          <button
            onClick={handleLoadMoreCritics}
            className="px-4 py-2 text-center text-3xl w-80 border border-gray-100 text-gray-100 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white capitalize"
          >
            view more critics
          </button>
        </div>
      )}
    </>
  );
};
export default CriticsGallery;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarList from "../CommonComponents/StarList";
import { getSelectedWine } from "../../services/wineService";

const FeaturedWineCard = ({ wineId }) => {
  const [wine, setWine] = useState({});

  useEffect(() => {
    const fetchWine = async () => {
      const data = await getSelectedWine(wineId);
      setWine(data);
    };
    fetchWine();
  }, []);

  return (
    <div className="bg-gray-50 p-5 pb-12 max-w-[30rem] grid grid-cols-3 grid-rows-4 relative rounded-md gap-4">
      {/* Image */}
      <div className="col-span-2 col-start-1 row-start-1 row-span-3 flex flex-col justify-center items-center">
        <img className="h-40" src={wine.img} alt={wine.name} />
        {/* Name */}
        <h4 className=" text-gray-800 text-3xl my-12 text-center">
          {wine.name} {wine.year}
        </h4>
      </div>

      {/* Tags */}
      <div className="col-start-3 row-start-1 row-span-3 flex flex-col justify-start  gap-4">
        {wine.tags?.map((tag, idx) => (
          <button
            key={tag + idx}
            className="px-4 py-2 border border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-default"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="col-span-3  row-start-4 flex flex-col gap-4">
        <StarList criticScore={wine.criticScore} />{" "}
        <div className="flex gap-4">
          <button className="border px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-default">
            avg price: ${wine.avgPrice}
          </button>
          <Link to={`${wine.linkToBuy}`}>
            <button className="border px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              buy
            </button>
          </Link>
          <Link to={`/wines/${wineId}`}>
            <button className="border px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWineCard;

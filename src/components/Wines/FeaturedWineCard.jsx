/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import StarList from "../CommonComponents/StarList";

const FeaturedWineCard = ({
  name,
  year,
  img = "https://winenliquor.com/wp-content/uploads/Dark-Horse-Cabernet-Sauvignon-750ml-Wine-N-Liquor.jpg",
  id,
  tags,
  avgPrice,
  criticScore,
  linkToBuy,
}) => {
  return (
    <div className="bg-gray-50 p-5 pb-12 max-w-[45rem] grid grid-cols-3 grid-rows-4 relative rounded-md gap-4">
      {/* Image */}
      <div className="col-span-2 col-start-1 row-start-1 row-span-3 flex flex-col justify-center items-center">
        <img className=" h-40" src={img} alt={name} />
        {/* Name */}
        <h4 className=" text-gray-800 text-3xl my-12 text-center">{name} {year}</h4>
      </div>

      {/* Tags */}
      <div className="col-start-3 row-start-1 row-span-3 flex flex-col justify-start  gap-4">
        {tags?.map((tag, idx) => (
          <button
            key={tag + idx}
            className="px-4 py-2 border border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="col-span-3  row-start-4 flex flex-col gap-4">
        <StarList criticScore={criticScore} />{" "}
        <div className="flex gap-4">
          <button className="border px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
            avg price: ${avgPrice}
          </button>
          <Link to={`${linkToBuy}`}>
            <button className="border px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              buy
            </button>
          </Link>
          <Link to={`/wines/${id}`}>
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

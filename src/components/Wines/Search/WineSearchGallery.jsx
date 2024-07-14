/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchBar from "../../CommonComponents/SearchBar";
import FeaturedWineCard from "../FeaturedWineCard";
import { getWines } from "../../../services/wineService";
import useGlobalContext from "../../../context/global/useGlobalContext";

const WineSearch = ({ title = "sample title" }) => {
  const { wines, fetchWines } = useGlobalContext();
  const [displayedWines, setDisplayedWines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleNextPage = () => {
    if (currentPage < 9) setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = currentPage * itemsPerPage;

  const handleWinePageNavigation = (idx) => {
    if (idx === 10) {
      handleNextPage();
    } else if (idx === 0) {
      handlePreviousPage();
    } else {
      setCurrentPage(idx);
    }
  };
  useEffect(() => {
    fetchWines();
    setDisplayedWines(wines.slice(startIndex, endIndex));
  }, []);
  useEffect(() => {
    setDisplayedWines(wines.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <div className="mt-80 mb-40">
      <div className="w-1/2 mx-auto">
        <SearchBar />
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">
          {title}
        </h1>
      </div>
      <WineSearchGallery displayedWines={displayedWines} />
      <div>
        <div className="my-12 w-3/4 ml-auto p-4 rounded-md flex bg-red-200 justify-center">
          <div className="w-1/2 mx-auto bg-blue-400 flex justify-center">
            {Array.from({ length: 11 }).map((btn, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => handleWinePageNavigation(idx)}
                  type="button"
                  className={`text-3xl bg-gray-700 text-gray-100 px-6 py-4 focus:outline-none ${
                    currentPage === idx
                      ? "bg-theme-sand-dark"
                      : "hover:bg-gray-600 "
                  } transition-colors duration-200`}
                >
                  <div>
                    {idx === 0 ? (
                      <span>&#x276E;</span>
                    ) : idx === 10 ? (
                      <span>&#x276F;</span>
                    ) : (
                      <span>{idx}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WineSearch;

export const WineSearchCard = () => {
  return <div>WineSearchGalleryCard</div>;
};

export const WineSearchGallery = ({ displayedWines }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start gap-4 ">
      {/* plan on using a modal on mobile for filtering */}
      <FilterComponent />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-3/4 mx-auto gap-12">
        {displayedWines.map((wine) => {
          return <FeaturedWineCard name={wine.name} img={wine.img} id={wine._id} tags={wine.tags} avgPrice={wine.avgPrice} linkToBuy={wine.linkToBuy} key={wine._id} />;
        })}
      </ul>
    </div>
  );
};

/*
  title,
  img = "https://winenliquor.com/wp-content/uploads/Dark-Horse-Cabernet-Sauvignon-750ml-Wine-N-Liquor.jpg",
  id,
  tags,
  avgPrice,
  linkToBuy,

*/

export const FilterComponent = () => {
  return (
    <div className="w-1/5 mx-auto mb-auto bg-neutral-800 text-gray-100 rounded-md p-4 h-full flex flex-col justify-start items-center">
      <h4 className="text-3xl mb-4">Filter</h4>

      {/* Filter by Category */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Grape</h5>
        <select className="w-full p-3 text-xl bg-neutral-600 rounded-md">
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      {/* region */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Region</h5>
        <select className="w-full p-3 text-xl bg-neutral-600 rounded-md">
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      {/* style */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Style</h5>
        <select className="w-full p-3 text-xl bg-neutral-600 rounded-md">
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      {/* winery */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Winery</h5>
        <select className="w-full p-3 text-xl bg-neutral-600 rounded-md">
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      {/* Filter by Price */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Price</h5>
        <select className="w-full p-3 text-xl bg-neutral-600 rounded-md">
          <option value="">Filter by Price</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Filter by Rating */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Rating</h5>
        <select className="w-full p-3 text-xl bg-neutral-600 rounded-md">
          <option value="">Select Rating</option>
          <option value="100">100</option>
          <option value="95+">95+</option>
          <option value="90-94">90 - 94</option>
          <option value="85-89">85-89</option>
          <option value="85>">under 85 </option>
        </select>
      </div>
    </div>
  );
};

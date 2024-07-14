/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchBar from "../../CommonComponents/SearchBar";
import FeaturedWineCard from "../FeaturedWineCard";
import { getWines } from "../../../services/wineService";
import useGlobalContext from "../../../context/global/useGlobalContext";
import { FilterComponent } from "./FilterComponent";

const WineSearch = ({ title = "sample title" }) => {
  const { wines, fetchWines, displayedWines, setDisplayedWines } =
    useGlobalContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
let winePageBtnsLength = Math.ceil(( wines.length / itemsPerPage) + 2);

  const handleNextPage = () => {
    if (currentPage < winePageBtnsLength - 2) setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
    console.log(winePageBtnsLength - 3)
    console.log(wines)
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = currentPage * itemsPerPage;

  const handleWinePageNavigation = (idx) => {
    if (idx === winePageBtnsLength -1) {
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
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-100">
          {wines.length} wines found
        </h1>
      </div>
      <WineSearchGallery displayedWines={displayedWines} />
      <div>
        <div className="my-12 w-3/4 ml-auto p-4 rounded-md flex justify-center">
          <div className="w-1/2 mx-auto flex justify-center items-center">
            {Array.from({ length: winePageBtnsLength }).map((btn, idx) => {
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
                    ) : idx === winePageBtnsLength -1 ? (
                      <span>&#x276F;</span>
                    ) : (
                      <span>{idx}</span>
                    )}
                  </div>
                </button>
                
              );
            })}
            <span className="text-gray-100 ml-10 text-2xl">
            {wines.length} wines found
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WineSearch;


export const WineSearchGallery = ({ displayedWines }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start gap-4 ">
      {/* plan on using a modal on mobile for filtering */}
      <FilterComponent />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-3/4 mx-auto gap-12">
        {displayedWines.map((wine) => {
          return (
            <FeaturedWineCard
              name={wine.name}
              img={wine.img}
              id={wine._id}
              tags={wine.tags}
              avgPrice={wine.avgPrice}
              linkToBuy={wine.linkToBuy}
              key={wine._id}
            />
          );
        })}
      </ul>
    </div>
  );
};

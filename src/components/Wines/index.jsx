// src/components/WineStyles.jsx
import React, { useEffect } from "react";
import useGlobalContext from "../../context/global/useGlobalContext";
import { Link } from "react-router-dom";

const WineStyles = () => {
  const { scrollToTop, wineCategories } = useGlobalContext();
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="bg-neutral-950 text-gray-100 min-h-screen p-8 mt-52">
      <div className="max-w-[120rem] mx-auto">
        {/* Search Bar */}
        <div className="relative mb-8 w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-4 text-gray-800 rounded-md"
          />
          <button className="absolute right-0 top-0 mt-4 mr-4">
            <svg
              className="h-6 w-6 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.707 22.293l-6.387-6.386C18.177 14.187 19 12.176 19 10 19 4.486 14.514 0 9 0S-1 4.486-1 10s4.486 10 10 10c2.176 0 4.187-.823 5.907-2.321l6.386 6.387c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414zM2 10c0-3.859 3.141-7 7-7s7 3.141 7 7-3.141 7-7 7-7-3.141-7-7z" />
            </svg>
          </button>
        </div>
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-center">Wine Styles</h1>
        {/* Categories */}
        {wineCategories.map((category, index) => (
          <div key={index} className="mb-12 bg-neutral-900 p-6 rounded-md">
            <h2 className="text-3xl font-semibold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.types.map((type, idx) => (
                <Link key={idx} to={`${type.path}`}>
                  <div className=" rounded-lg overflow-hidden shadow-xl">
                    <img
                      className="w-full h-48 object-cover"
                      src={type.img}
                      alt={type.name}
                    />
                    <div className="p-4">
                      <h3 className="text-2xl font-semibold mb-2">
                        {type.name}
                      </h3>
                      <p className="text-gray-400">{type.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-12 bg-neutral-900 p-6 rounded-md max-w-[120rem] mx-auto flex justify-between gap-12">
        <img
          className="rounded-md"
          src="https://www.wine-searcher.com/images/wine-glass.jpg?width=559&height=230&fit=crop"
          alt=""
        />
        <div className="flex flex-col items-center justify-between">
          <div>
            <h2 className="text-4xl mb-12 text-center">Types of Wine</h2>
            <p className="text-xl">
              Take a broader look at the huge range of choices which face wine
              lovers and enthusiasts alike. Explore the basics such as red wine,
              white wine, rosé, dessert and sparkling wine, through to grape
              varieties, regions and appellations. There are also different
              winemaking techniques to consider, categories such as organic,
              vegan-friendly and kosher wine, and food and wine pairing.
            </p>
          </div>
          <Link to={`/wines/wine-types`}>
            <button className="px-6 py-4 border rounded-md relative text-3xl text-gray-100 border-gray-100 capitalize hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 ease-in-out -translate-y-1">
              learn more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WineStyles;

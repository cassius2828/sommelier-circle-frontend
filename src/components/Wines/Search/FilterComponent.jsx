import { useEffect, useState } from "react";
import useGlobalContext from "../../../context/global/useGlobalContext";

const regionOptions = [
  "Bordeaux",
  "Burgundy",
  "Sauternes",
  "Marlborough",
  "Columbia Valley",
  "Provence",
  "Niagara Peninsula",
  "Champagne",
  "Tuscany",
  "Napa Valley",
  "California",
  "Piedmont",
  "Ribera del Duero",
  "Sonoma",
  "Colchagua Valley",
  "Douro Valley",
  "Rhone Valley",
  "South Australia",
  "Washington",
  "Margaux",
  "Pauillac",
  "Saint-Estèphe",
  "Mosel",
  "Douro",
  "Rhône",
  "Barsac",
  "Puente Alto",
  "Maipo Valley",
  "Barossa Valley",
  "Anderson Valley",
  "Carneros",
  "Rhone",
  "Mendoza",
  "Umbria",
  "Penedes",
  "Rioja",
  "Alsace",
  "Auckland",
  "Sonoma County",
  "McLaren Vale",
];
const grapeOptions = [
  "Cabernet Sauvignon",
  "Pinot Noir",
  "Semillon",
  "Sauvignon Blanc",
  "Riesling",
  "Grenache",
  "Vidal Blanc",
  "Chardonnay",
  "Zinfandel",
  "Nebbiolo",
  "Tempranillo",
  "Carmenere",
  "Sangiovese",
  "Touriga Nacional",
  "Shiraz",
  "Merlot",
  "Sémillon",
  "Syrah",
  "Viognier",
];

export const FilterComponent = () => {

  const {formData,setFormData, handleUpdateForm,initialFormData} = useGlobalContext()



  
  return (
    <div className="w-1/5 mx-auto mb-auto bg-neutral-800 text-gray-100 rounded-md p-4 h-full flex flex-col justify-start items-center">
      <h4 className="text-3xl mb-4">Filter</h4>

      {/* Filter by Category */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Grape</h5>
        <select
          value={formData.grape}
          name="grape"
          onChange={handleUpdateForm}
          className="w-full p-3 text-xl bg-neutral-600 rounded-md"
        >
          <option value="">Filter by Grape</option>
          {grapeOptions.map((grape, index) => (
            <option key={index} value={grape}>
              {grape}
            </option>
          ))}
        </select>
      </div>
      {/* region */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Region</h5>
        <select
          value={formData.region}
          name="region"
          onChange={handleUpdateForm}
          className="w-full p-3 text-xl bg-neutral-600 rounded-md"
        >
          <option value="">Filter by Region</option>
          {regionOptions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      {/* style */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Style</h5>
        <select
          value={formData.style}
          name="style"
          onChange={handleUpdateForm}
          className="w-full p-3 text-xl bg-neutral-600 rounded-md"
        >
          <option value="">Filter by Style</option>
          <option value="red">red</option>
          <option value="white">white</option>
          <option value="dessert">dessert</option>
          <option value="rose">rose</option>
          <option value="sparkling">sparkling</option>
        </select>
      </div>

      {/* Filter by Price */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Price</h5>
        <select
          value={formData.price}
          name="price"
          onChange={handleUpdateForm}
          className="w-full p-3 text-xl bg-neutral-600 rounded-md"
        >
          <option value="">Filter by Price</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Filter by Rating */}
      <div className="mb-10 w-full">
        <h5 className="text-2xl mb-2">Rating</h5>
        <select
          value={formData.rating}
          name="rating"
          onChange={handleUpdateForm}
          className="w-full p-3 text-xl bg-neutral-600 rounded-md"
        >
          <option value="">Select Rating</option>
          <option value="100">100</option>
          <option value="95+">95 - 99</option>
          <option value="90-94">90 - 94</option>
        </select>
      </div>
      <button
        onClick={() => setFormData(initialFormData)}
        className="capitalize text-2xl bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
      >
        reset filter
      </button>
    </div>
  );
};

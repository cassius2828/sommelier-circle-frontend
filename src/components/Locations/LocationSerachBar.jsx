import { useState } from "react";

export const LocationSearchbar = () => {
    const [formData, setFormData] = useState({});
    ///////////////////////////
    // Handle Search Query
    ///////////////////////////
    const handleSearchQuery = (e) => {
      const { value } = e.target;
      setFormData(value);
    };
    return (
      <div className="flex justify-center items-center mb-20  w-1/2">
        <div className="relative mb-8 w-full  items-center">
          {/* search bar */}
          <input
            name="query"
            value={formData}
            onChange={handleSearchQuery}
            type="text"
            placeholder="Search"
            className="w-full p-4 text-gray-800 rounded-md"
          />
          {/* search icon */}
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
  
        {/* clear search btn */}
        <button
          // onClick={() => setFormData({ ...formData, query: "" })}
          className=" border-neutral-200 w-48 border text-2xl ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
        >
          clear search
        </button>
      </div>
    );
  };
  
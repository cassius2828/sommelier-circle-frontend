import { EventGrid } from "./EventGrid";

const DisplayEvents = ({
  formData,
  handleInputChange,
  setFormData,
  showFilters,
  setShowFilters,
  events,
}) => {
  return (
    <div className="flex flex-col w-full  min-h-screen pt-12 mt-52 md:mt-80 items-center">
      <h1 className="text-8xl text-gray-100 mb-12">Events</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="relative mb-8 w-full md:w-1/2  items-center">
            {/* search bar */}
            <input
              name="query"
              value={formData.query}
              onChange={handleInputChange}
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
            onClick={() => setFormData({ ...formData, query: "" })}
            className=" border-neutral-200 border text-2xl md:ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
          >
            clear search
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className=" border-neutral-200 border text-2xl md:ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
            >
              filter by
            </button>
            {showFilters && (
              <ul className="w-full absolute top-full bg-blue-500 flex flex-col items-center justify-start rounded-md">
                <li
                  onClick={() => setShowFilters(false)}
                  className="bg-red-400 p-3 text-xl w-full cursor-pointer hover:bg-red-600"
                >
                  city
                </li>{" "}
                <li
                  onClick={() => setShowFilters(false)}
                  className="bg-red-400 p-3 text-xl w-full cursor-pointer hover:bg-red-600"
                >
                  date
                </li>{" "}
                <li
                  onClick={() => setShowFilters(false)}
                  className="bg-red-400 p-3 text-xl w-full cursor-pointer hover:bg-red-600"
                >
                  time of day
                </li>
              </ul>
            )}
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-100">
          {events.length} events found
        </h1>
      </div>
      <EventGrid events={events} />
    </div>
  );
};
export default DisplayEvents;

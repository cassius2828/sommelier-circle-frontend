import { useEffect, useState } from "react";

// this component gets access to ALL events, not just displayed events
const ExploreFilter = ({ setShowFilters, events }) => {
  return (
    <ul className="w-full min-w-96 absolute top-full bg-neutral-700 flex flex-col items-center justify-start rounded-md">
      <CityFilterList
        events={events}
        setShowFilters={setShowFilters}
        text={`City`}
        filter={`city`}
      />
      <MonthFilterList
        events={events}
        setShowFilters={setShowFilters}
        text={`Month`}
        filter={`month`}
      />
      <TodFilterList
        events={events}
        setShowFilters={setShowFilters}
        text={`Time of Day`}
        filter={`tod`}
      />
    </ul>
  );
};
export default ExploreFilter;

export const CityFilterList = ({ text, events, filter }) => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [query, setQuery] = useState("");
  ///////////////////////////
  //   Filter States
  ///////////////////////////
  const [displayFilterValues, setDisplayFilterValues] = useState([]);
  const [filterValues, setFilterValues] = useState([]);

  ///////////////////////////
  // Handle Filter Search
  ///////////////////////////
  const handleSearchFilterCategory = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length > 2) {
      const filteredBySearch = displayFilterValues.filter((filterValue) =>
        String(filterValue).toLowerCase().includes(value.toLowerCase())
      );
      setDisplayFilterValues(filteredBySearch);
    }
    if (value.length === 0) {
      setDisplayFilterValues(filterValues);
    }
  };

  ///////////////////////////
  //   Initialize Filter Values
  ///////////////////////////
  const handleInitializeFilterValues = () => {
    const uniqueFilterValues = new Set();

    events.forEach((event) => {
      uniqueFilterValues.add(event[filter]);
    });
    const sortedFilterValues = Array.from(uniqueFilterValues).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    setFilterValues(sortedFilterValues);
    setDisplayFilterValues(sortedFilterValues);
  };

  useEffect(() => {
    handleInitializeFilterValues();
  }, []);
  return (
    <>
      <li
        onClick={() => setShowDropDown((prev) => !prev)}
        className="bg-neutral-900 text-gray-100 p-3 text-xl w-full cursor-pointer hover:bg-neutral-800"
      >
        {filter === "city" ? `Cities -- ${filterValues.length}` : text}
      </li>
      {showDropdown && (
        <ul className="  w-full max-h-48 overflow-y-scroll">
          {filterValues.length > 3 && (
            <div className="relative mb-2 w-full  items-center">
              {/* search bar */}
              <input
                name="query"
                value={query}
                onChange={(e) => {
                  handleSearchFilterCategory(e);
                }}
                type="text"
                placeholder={`Search for ${filter}`}
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
          )}
          {displayFilterValues?.map((filterValue, idx) => {
            return (
              <li
                key={filterValue + idx}
                className="bg-neutral-700 text-gray-100 p-3 pl-8 text-xl w-full cursor-pointer  hover:bg-neutral-600"
              >
                {filterValue}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export const MonthFilterList = ({ text }) => {
  const [showDropdown, setShowDropDown] = useState(false);
  const monthsOfYear = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return (
    <>
      <li
        onClick={() => setShowDropDown((prev) => !prev)}
        className="bg-neutral-900 text-gray-100 p-3 text-xl w-full cursor-pointer hover:bg-neutral-800"
      >
        {text}
      </li>
      {showDropdown && (
        <ul className="  w-full max-h-48 overflow-y-scroll">
          {monthsOfYear?.map((month, idx) => {
            return (
              <li
                key={month + idx}
                className="bg-neutral-700 text-gray-100 p-3 pl-8 text-xl w-full cursor-pointer  hover:bg-neutral-600 capitalize"
              >
                {month}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export const TodFilterList = ({ text }) => {
  const [showDropdown, setShowDropDown] = useState(false);
  const tod = ["morning", "afternoon", "evening", "late night"];
  return (
    <>
      <li
        onClick={() => setShowDropDown((prev) => !prev)}
        className="bg-neutral-900 text-gray-100 p-3 text-xl w-full cursor-pointer hover:bg-neutral-800"
      >
        {text}
      </li>
      {showDropdown && (
        <ul className="  w-full max-h-48 overflow-y-scroll">
          {tod?.map((time, idx) => {
            return (
              <li
                key={time + idx}
                className="bg-neutral-700 text-gray-100 p-3 pl-8 text-xl w-full cursor-pointer  hover:bg-neutral-600 capitalize"
              >
                {time}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

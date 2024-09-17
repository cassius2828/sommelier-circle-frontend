import { useCallback, useState } from "react";
import { getWinePlacesAutocomplete } from "../../services/googlePlacesService";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const AutoCompleteInput = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const countryCode = sessionStorage.getItem("countryCode");
  ///////////////////////////
  //  On Change to Trigger API Request to Backend ||
  //  Using lodash to reduce number of API request as user types
  ///////////////////////////
  const fetchQuerySearchLocationResults = useCallback(
    debounce(async () => {
      setIsLoading(true);
      try {
        const data = await getWinePlacesAutocomplete(query, countryCode);
        setSearchResults(data);
      } catch (err) {
        console.error(err);
        console.log(
          `Error searching and displaying locations | Locations index.jsx`
        );
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [query]
  );

  ///////////////////////////
  //   Handle Change
  ///////////////////////////
  const handleQueryChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    fetchQuerySearchLocationResults();
  };

  return (
    <div className="relative mb-12 w-96">
      {/* search input */}
      <div className=" bg-white flex rounded-e-sm rounded-s-sm overflow-hidden">
        <input
          value={query}
          onChange={handleQueryChange}
          className="p-2  w-[90%]"
          type="text"
          name="query"
          id="query"
          placeholder="Search wine locations | ex: Napa Wineries"
        />{" "}
        <div className="rounded-e-2xl relative ">
          {/* clear search */}
          <span
            onClick={() => setQuery("")}
            className=" p-2  h-full w-full inline-block text-2xl text-gray-600  cursor-pointer "
          >
            x
          </span>
        </div>
      </div>
      {/* search results */}
      {searchResults?.length > 0 && (
        <ul className="bg-white absolute top-[125%] w-full rounded-sm z-10">
          {searchResults.map((location) => {
            return (
              <Link
                key={location.place_id}
                to={`/locations/location-details/${location.place_id}`}
              >
                <li className="p-2 hover:bg-gray-200 cursor-pointer">
                  {isLoading ? "loading..." : location.description}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default AutoCompleteInput;

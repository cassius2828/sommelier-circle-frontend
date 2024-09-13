import { Link } from "react-router-dom";
import usePlacesContext from "../../context/places/usePlacesContext";
import { Star } from "../CommonComponents/StarList";
import { useEffect } from "react";
import useAuthContext from "../../context/auth/useAuthContext";
import useGlobalContext from "../../context/global/useGlobalContext";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";
import { deleteItemIndexedDB } from "../../utils/indexedDB.config";

const LocationsTableList = ({ rooms }) => {
  // const { rooms } = usePlacesContext();
  const { handleRefreshFavLocationCache, favoritesMessage, setFavoritesMessage } =
    useGlobalContext();
  const { user } = useAuthContext();



  useEffect(() => {
    console.log(user, " <-- LOCATIONS");
  }, []);
  return (
    <div className="overflow-x-auto mb-24 bg-[#111213]">
      <table className="min-w-full bg-[#111213] border border-gray-700">
        {/* head */}
        <thead>
          <tr>
          <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Address
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Rating
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Open Status
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Add to Favorites
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 text-xl">
              Details
            </th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {rooms?.map((location, idx) => (
            <tr key={location.place_id + idx} className="hover:bg-gray-800">
              {/* location.result name */}
              <td className="py-2 px-4  border-b border-gray-700 text-center  gap-4 text-gray-100 text-xl">

              <img
                  className="w-20 h-20 object-cover mx-auto"
                  src={location.photo}
                  alt=""
                />
              </td>
              <td className="py-2 px-4  border-b border-gray-700 text-center  gap-4 text-gray-100 text-xl">
                {location.name}
              </td>
              {/* address */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 text-xl">
                {location.vicinity}
              </td>
              {/* rating */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 text-xl">
                {location.rating}
              </td>
              {/* open status */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 text-xl">
                {location.opening_hours?.open_now ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </td>
              {/* favorites */}
              <td className="py-2 px-4 border-b border-gray-700 text-center">
                <button
                  onClick={() =>
                    handleRefreshFavLocationCache(user._id, location.place_id)
                  }
                  className="p-2 border-2 border-[#FFD700] rounded-lg"
                >
                  <Star width={6} />
                </button>
              </td>
              {/* details */}
              <td className="py-2 px-4 border-b border-gray-700 text-center">
                <Link to={`/locations/location-details/${location.place_id}`}>
                  <button className="border px-3 py-1  rounded-md text-gray-100 text-xl border-gray-800 transition-colors duration-300 hover:bg-gray-900 hover:text-white">
                    details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {favoritesMessage && (
        <AddedToFavoritesModal
          message={favoritesMessage}
          setMessage={setFavoritesMessage}
        />
      )}
    </div>
  );
};
export default LocationsTableList;

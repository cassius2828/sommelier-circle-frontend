import { Link } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";
import LoaderSpin from "../CommonComponents/LoaderSpin";
import StarList, { Star } from "../CommonComponents/StarList";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";

export const LocationCard = ({
    rating,
    name,
    address,
    isOpen,
    photo,
    placeId,
    currentUser,
  }) => {
    const calculatedRating = rating * 20;
    const { handleRefreshFavLocationCache, favoritesMessage, setFavoritesMessage } =
      useGlobalContext();
    return (
      <div className="grid grid-cols-2 p-4  overflow-hidden ">
        {/* row 1 */}
        {photo ? (
          <img
            className="col-span-2 row-start-1 rounded-lg mb-5 h-96 w-full object-cover"
            src={
              photo
                ? photo
                : `https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`
            }
            alt=""
          />
        ) : (
          <LoaderSpin />
        )}
  
        {/* row 2 */}
        {/* //* col 1 */}
        <div className="flex flex-col items-center justify-between p-4">
          <div className="text-center">
            <span className="text-3xl text-gray-100"> rating: {rating} </span>
            <StarList bgColor="[#0a0a0a]" criticScore={calculatedRating} />
          </div>
  
          {isOpen ? (
            <span className="text-3xl text-green-500 ">Now Open</span>
          ) : (
            <span className="text-3xl text-red-500 ">Closed</span>
          )}
        </div>
        {/* //* col 2 */}
        <div className="flex flex-col items-center justify-between text-gray-100">
          <div className="text-center">
            <h2 className="text-4xl mb-3">{name}</h2>
            <h3 className="text-2xl">{address}</h3>{" "}
          </div>
          <div className="mt-6 gap-12 flex justify-center ">
            <button
              onClick={() =>
                handleRefreshFavLocationCache(currentUser._id, placeId, "locations")
              }
              className="p-2 border-2 border-[#FFD700] rounded-lg"
            >
              <Star />
            </button>
            {favoritesMessage && (
              <AddedToFavoritesModal
                message={favoritesMessage}
                setMessage={setFavoritesMessage}
              />
            )}
            <Link to={`/locations/location-details/${placeId}`}>
              <button className="border h-full px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
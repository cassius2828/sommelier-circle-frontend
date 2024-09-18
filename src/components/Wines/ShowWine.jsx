/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import StarList from "../CommonComponents/StarList";
import { UilStar, UilShare, UilShoppingCart } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { getSelectedWine } from "../../services/wineService";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";
import useAuthContext from "../../context/auth/useAuthContext";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";
import SocialMediaShareModal from "../Modals/SocialMediaShareModal";

const ShowWine = () => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [shareModelIsOpen, setShareModalIsOpen] = useState(false);
  const [wine, setWine] = useState({});
  // context
  const {
    isLoading,
    setIsLoading,
    handleAddToFavorites,
    favoritesMessage,
    setFavoritesMessage,
  } = useGlobalContext();
  const { user } = useAuthContext();
  // hooks
  const { wineId } = useParams();
  const navigate = useNavigate();

  ///////////////////////////
  // Handle Display Full Details
  ///////////////////////////
  const handleDisplayFullDetails = () => {
    setShowFullDetails((prev) => !prev);
  };

  ///////////////////////////
  // Fetch Wine
  ///////////////////////////
  const fetchWine = async () => {
    setIsLoading(true);
    try {
      const data = await getSelectedWine(wineId);
      setWine(data);
    } catch (err) {
      console.error(err);
      console.log(`Error fetching wine data`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWine();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="relative p-4 mb-32 mt-96 mx-auto border-4 overflow-hidden border-theme-sand-dark rounded-md border-3 bg-gray-50 max-w-[60rem]">
        <span
          onClick={() => navigate(-1)}
          className="absolute text-3xl cursor-pointer top-4 right-4"
        >
          x
        </span>
        {/* image */}
        <img
          className="w-1/3 float-left mr-4 mb-4"
          src={wine.img}
          alt={wine.name}
        />
        {/* text details */}
        <div>
          <h3 className="text-5xl mb-6">{wine.name}</h3>
          <div className="text-left text-2xl space-y-2">
            <div>
              <span className="font-bold">Year: </span>
              <span>{wine.year}</span>
            </div>{" "}
            <div>
              <span className="font-bold">Region: </span>
              <span>{wine.region}</span>
            </div>
            <div>
              <span className="font-bold">Grape: </span>
              <span>{wine.grape}</span>
            </div>
            <div>
              <span className="font-bold">Average Price: </span>
              <span>{wine.avgPrice}</span>
            </div>
            <div>
              <span className="font-bold">Winery: </span>
              <span>{wine.winery}</span>
            </div>
            <div>
              <span className="font-bold">Style: </span>
              <span>{wine.category}</span>
            </div>
            <div>
              <span className="font-bold">Critic Score: </span>
              <span>{wine.criticScore}</span>
            </div>
            <div className="relative">
              <StarList criticScore={wine.criticScore} />
            </div>
          </div>
          <div>
            <p className="text-xl mt-5">
              {showFullDetails
                ? wine.description
                : wine?.description?.slice(0, 70) + "..."}
            </p>
            <button
              onClick={handleDisplayFullDetails}
              className="text-xl font-bold mt-4 text-red-700 hover:text-red-800 transition-colors duration-200 ease-in-out"
            >
              {showFullDetails ? "hide details" : "view more details"}
            </button>
          </div>
        </div>
        {/* tags */}
        <div className="tags absolute right-5 top-1/3 -translate-y-1/2 flex flex-col space-y-2">
          {wine?.tags?.map((tag) => (
            <button
              key={tag + wine._id}
              className="cursor-default rounded-lg border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out px-4 py-2"
            >
              {tag}
            </button>
          ))}
        </div>
        {/* btn container */}
        <div className="flex items-center gap-4 mt-12 mb-6  w-1/3 justify-center">
          {/* cart */}
          <Link to={wine.linkToPurchase}>
            <button className="p-2 border-2 border-[#31C91A] rounded-lg">
              <UilShoppingCart size="24" color="#31C91A" />
            </button>
          </Link>
          {/* favorite */}
          <button
            onClick={() => handleAddToFavorites(user?._id, wineId, "wines")}
            className="p-2 border-2 border-[#FFD700] rounded-lg"
          >
            <UilStar size="24" color="#FFD700" />
          </button>
          {/* share */}
          <button
            onClick={() => setShareModalIsOpen(true)}
            className="p-2 border-2 border-[#808080] rounded-lg"
          >
            <UilShare size="24" color="#808080" />
          </button>
        </div>
        {shareModelIsOpen && (
          <SocialMediaShareModal
            mediaType={`wineId`}
            wineName={wine.name}
            handleClose={() => setShareModalIsOpen(false)}
          />
        )}{" "}
        {favoritesMessage && (
          <AddedToFavoritesModal
            message={favoritesMessage}
            setMessage={setFavoritesMessage}
          />
        )}
      </div>
    </>
  );
};

export default ShowWine;

// React and Hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Services
import { getCriticDetails } from "../../services/criticService";
// Icons
import { UilStar } from "@iconscout/react-unicons";
// Components
import LoaderSpin from "../CommonComponents/LoaderSpin";
import AddedToFavoritesModal from "../Modals/AddedToFavoritesModal";
// Context and Hooks
import useGlobalContext from "../../context/global/useGlobalContext";
import useAuthContext from "../../context/auth/useAuthContext";

const ShowCritic = () => {
  const [criticDetails, setCriticDetails] = useState({});
  const { img, name, awards, experience, bio } = criticDetails;
  // context
  const { favoritesMessage, setFavoritesMessage, handleAddToFavorites } =
    useGlobalContext();
  const { user } = useAuthContext();
  // hooks
  const { criticId } = useParams();
  const navigate = useNavigate();

  ///////////////////////////
  // Fetch Critic Details
  ///////////////////////////
  const fetchCriticDetails = async () => {
    try {
      const data = await getCriticDetails(criticId);
      if (data) {
        setCriticDetails(data);
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service file to get critic details`);
    }
  };

  useEffect(() => {
    fetchCriticDetails();
    console.log();
  }, []);

  return (
    <div className="p-4 bg-neutral-900 flex flex-col md:flex-row max-w-[90rem] pt-12 mt-52 md:mt-80 mx-auto relative">
      <div className=" w-full md:ml-8">
        {/* image */}
        {img ? (
          <img
            className=" h-96  mx-auto object-contain md:object-cover"
            src={
              img
                ? img
                : `https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`
            }
            alt={name}
          />
        ) : (
          <LoaderSpin />
        )}
      </div>
      <div className="flex flex-col p-4 text-gray-200">
        <div className="w-full md:w-3/4">
          <h3 className="text-4xl text-center">{name}</h3>
        </div>
        {/* exp */}
        <div className="flex justify-start items-center gap-12 w-full md:w-3/4 md:ml-auto mt-8">
          <h4 className="text-3xl text-center">Experience: </h4>{" "}
          <span className="text-2xl"> {experience} years</span>
        </div>
        {/* awards */}
        <div className="flex flex-col items-start justify-between w-full md:w-3/4 md:ml-auto my-8">
          <h4 className="text-3xl text-center mb-8">Awards:</h4>

          <div className="flex md:flex-col gap-8 ">
            {awards?.map((award, idx) => (
              <AwardBtn key={award + idx} text={award} />
            ))}
          </div>
        </div>

        <p className="p-8 text-2xl">{bio}</p>
      </div>{" "}
      {/* action btns */}
      <button
        onClick={() => navigate(-1)}
        className="md:absolute  -bottom-52 left-1/2 md:-translate-x-1/2 text-3xl w-3/4 md:w-1/3 mx-auto my-12 bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
      >
        back
      </button>
      {/* favorite */}
      <div className="flex items-center gap-8 mb-12 justify-center md:absolute  -bottom-36 left-1/2 md:-translate-x-1/2">
        <button
          onClick={() => handleAddToFavorites(user?._id, criticId, "critics")}
          className="p-2 border-2 border-[#FFD700] rounded-lg"
        >
          <UilStar size="24" color="#FFD700" />
        </button>
        <span className="text-gray-100 text-2xl">Add to Favorites</span>
      </div>
      {favoritesMessage && (
        <AddedToFavoritesModal
          message={favoritesMessage}
          setMessage={setFavoritesMessage}
        />
      )}
    </div>
  );
};
export default ShowCritic;

export const AwardBtn = ({ text }) => {
  return (
    <span className="text-xl  mx-2  bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200">
      {text}
    </span>
  );
};

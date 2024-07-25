import { Link, useNavigate, useParams } from "react-router-dom";
import StarList, { Star } from "../CommonComponents/StarList";
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../../services/googlePlacesService";
import useGlobalContext from "../../context/global/useGlobalContext";
import Loader from "../CommonComponents/Loader";

const ShowRoom = () => {
  return (
    <div className="w-full mt-80">
      <ShowRoomCard />
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
    </div>
  );
};
export default ShowRoom;

export const ShowRoomCard = () => {
  const [placeDetails, setPlaceDetails] = useState({});
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { isLoading, setIsLoading } = useGlobalContext();

  const rating = placeDetails.rating * 20
  const fetchPlaceDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getPlaceDetails(roomId);
      setPlaceDetails(data);
    } catch (err) {
      console.error(err);
      console.log(
        `Error communicating with backend to retrieve place details from google place api`
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(roomId);
    // fetchPlaceDetails()
  }, [roomId]);
  console.log(placeDetails);
  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-3 grid-rows-3 bg-[#111213] shadow-lg w-full lg:w-1/2 mx-auto max-h-[50rem] text-gray-100 rounded-md p-4 relative">
      <span
        onClick={() => navigate(-1)}
        className="absolute top-0 right-4 text-5xl cursor-pointer"
      >
        x
      </span>
      {/* img, title, address, rating */}
      <div className="col-start-1 row-span-3 p-4 flex flex-col justify-between">
        <img
          className="h-1/2 object-cover"
          src="https://www.travelandleisure.com/thmb/daFAjn1P8k4Z33HO_yVh8LQPEVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lead-lalou-bar-NYWINE1019-055f40b36a1a467f832651cb7feaad97.jpg"
          alt=""
        />
        <div className="flex-col flex gap-4">
          <h1 className=" text-6xl">{placeDetails.name}</h1>
          <h2 className=" text-4xl">
            {placeDetails.formatted_address}
          </h2>
          <StarList bgColor="[#]" criticScore={rating} />
          {/* buttons | fav, directions, website */}
          <div className="flex items-center  justify-center gap-4 mr-auto mt-12 ">
            <button className="p-2 h-16 border-2 border-[#FFD700] rounded-lg">
              <Star />
            </button>
            <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              directions
            </button>{" "}
            <Link to={placeDetails.website}>
              <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                website
              </button>
            </Link>
            <button className="border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              reserve
            </button>
          </div>
        </div>
      </div>
      {/* details */}
      <p className="col-span-2 col-start-2 row-start-1 text-2xl mt-12 p-4">
      {placeDetails.editorial_summary.overview}

      </p>

      {/* hours of operation */}
      <div className="flex items-start justify-end gap-6 mt-12 col-span-2 col-start-2 row-start-2 ">
        <div className="flex flex-col">
          <h3 className=" text-3xl p-3">Hours</h3>
          <ul className="flex flex-col items-start justify-start">
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Mon: 9-5
            </li>
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Tues: 9-5
            </li>
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Wed: 9-5
            </li>
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Thur: 9-5
            </li>
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Fri: 9-5
            </li>
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Sat: 12-8
            </li>
            <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
              Sun: 9-12
            </li>
          </ul>
        </div>
        {/* contact info */}
        <div className="flex flex-col items-start justify-start gap-3">
          <h4 className=" text-3xl p-3">Contact</h4>
          <ul className="flex flex-col items-start justify-start gap-4">
            <a href="tel:5555555555">
              <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                Phone: {placeDetails.formatted_phone_number}
              </li>
            </a>
            <a href="mailto:example@gmail.com">
              <li className="p-4 text-xl w-full hover:bg-neutral-800 transition-colors duration-200 ease-in-out">
                Email: business@gmail.com
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};


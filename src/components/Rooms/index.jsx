import { useEffect, useState } from "react";
import StarList, { Star } from "../CommonComponents/StarList";
import { Link } from "react-router-dom";
import { getNearbyWinePlaces, getUserLocation } from "../../services/googlePlacesService";

const Rooms = () => {
  useEffect(() => {
    getNearbyWinePlaces()
  },[])
  return (
    <div className="flex flex-col w-full  min-h-screen mt-80 items-center">
      <RoomSearchbar />
      <h1 className="text-gray-100 text-5xl mb-12">Recommendations</h1>
      <RoomsGrid />
    </div>
  );
};
export default Rooms;

export const RoomSearchbar = () => {
  const [formData, setFormData] = useState({});
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

export const RoomsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
      <RoomCard />
      <RoomCard />
      <RoomCard />
      <RoomCard />
      <RoomCard />
      <RoomCard />
      <RoomCard />
      <RoomCard />
    </div>
  );
};

export const RoomCard = () => {
  return (
    <div className="grid grid-cols-2 p-4  overflow-hidden ">
      {/* row 1 */}
      <img
        className="col-span-2 row-start-1 rounded-lg mb-5"
        src="https://www.travelandleisure.com/thmb/daFAjn1P8k4Z33HO_yVh8LQPEVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lead-lalou-bar-NYWINE1019-055f40b36a1a467f832651cb7feaad97.jpg"
        alt=""
      />
      {/* row 2 */}
      {/* //* col 1 */}
      <div className="flex flex-col items-center justify-center p-4">
        <StarList bgColor="[#111213]" criticScore={90} />
        <p className="text-xl text-gray-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          reiciendis laudantium culpa, exercitationem, sed corporis vel sequi
          iste magnam error recusandae ab eaque mollitia dolor odio qui tempore
          repudiandae quae?
        </p>
      </div>
      {/* //* col 2 */}
      <div className="flex flex-col items-center justify-between text-gray-100">
        <div className="text-center">
          <h2 className="text-4xl mb-3">Title</h2>
          <h3 className="text-2xl">
            Address 123, main st <br />
            95687 city, CA
          </h3>{" "}
        </div>
        <div className="mt-6 gap-4 flex justify-center ">
          <button className="p-2 border-2 border-[#FFD700] rounded-lg">
            <Star />
          </button>
          <Link to={`/rooms/:roomId`}>
            <button className="border h-full px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

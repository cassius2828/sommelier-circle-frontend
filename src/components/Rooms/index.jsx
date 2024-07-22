import { useEffect, useState } from "react";
import StarList, { Star } from "../CommonComponents/StarList";
import { Link } from "react-router-dom";
import { getNearbyWinePlaces, getUserLocation } from "../../services/googlePlacesService";
import usePlacesContext from "../../context/places/usePlacesContext";

const Rooms = () => {
  const {fetchRooms} = usePlacesContext()
  useEffect(() => {
    fetchRooms()
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
  const {rooms} = usePlacesContext()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-y-8 gap-x-4">
      {rooms.map((room,idx) => <RoomCard img={room.photos[0].photo_reference} placeId={room.place_id} rating={room.rating} name={room.name} address={room.vicinity} key={idx}/>)}
      
      <RoomCard />

    </div>
  );
};

export const RoomCard = ({rating, name, address, placeId, isOpen, img}) => {
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
          <h2 className="text-4xl mb-3">{name}</h2>
          <h3 className="text-2xl">
        {address}
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


/*
PLACES API OBJECT
Main Img: 
Title: 
Details: 
Address: 
Rating: 
Price: 
Website: 
Hours of Operation: 
Place ID: 

       {
            "business_status": "OPERATIONAL",
            "geometry": {
                "location": {
                    "lat": 38.386936,
                    "lng": -121.933056
                },
                "viewport": {
                    "northeast": {
                        "lat": 38.38841077989272,
                        "lng": -121.9316805701072
                    },
                    "southwest": {
                        "lat": 38.38571112010727,
                        "lng": -121.9343802298927
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
            "icon_background_color": "#FF9E67",
            "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
            "name": "Hide-A-Way Lounge & Grill",
            "opening_hours": {
                "open_now": true
            },
            "photos": [
                {
                    "height": 1536,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/107061166225374119247\">Wez So_N_So</a>"
                    ],
                    "photo_reference": "AUc7tXViEv5OfN09WTJ4yUbwx5h3pikBlEX9ly-cP79zDzL9syRQV0oJEPYUhRG8dF7TZXOaS_myepa7TKcdYV6SfrA6a1e79ye_6MgQlP_Xw1YUQsdKN-MTLDyPrGwZWYSQHIoGPDS8T3ud77u9K2vRCw0A7KqhieSd-E_X5jS7cpvH-cj-",
                    "width": 2048
                }
            ],
            "place_id": "ChIJg9zeYjojhYARcjTx7WobLTQ",
            "plus_code": {
                "compound_code": "93P8+QQ Vacaville, California",
                "global_code": "84CW93P8+QQ"
            },
            "price_level": 2,
            "rating": 4.2,
            "reference": "ChIJg9zeYjojhYARcjTx7WobLTQ",
            "scope": "GOOGLE",
            "types": [
                "bar",
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 427,
            "vicinity": "1080 Orange Dr, Vacaville"
        },

*/
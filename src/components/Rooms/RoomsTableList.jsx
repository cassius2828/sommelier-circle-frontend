import { Link } from "react-router-dom";
import usePlacesContext from "../../context/places/usePlacesContext";
import { Star } from "../CommonComponents/StarList";

const RoomsTableList = () => {
  const { rooms } = usePlacesContext();
  return (
    <div className="overflow-x-auto mb-24">
      <table className="min-w-full bg-white border border-gray-200">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Rating</th>
            <th className="py-2 px-4 border-b">Open Status</th>
            <th className="py-2 px-4 border-b">Add to Favorites</th>
            <th className="py-2 px-4 border-b">Details</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {rooms?.map((room, idx) => (
            <tr key={room.place_id + idx} className="hover:bg-gray-100">
              {/* room name */}
              <td className="py-2 px-4 border-b flex items-center gap-4">
                <img className="w-20 h-20 object-cover" src={room.photo} alt="" />
                {room.name}
                </td>{" "}
              {/* address */}
              <td className="py-2 px-4 border-b">{room.vicinity}</td>
              {/* rating */}
              <td className="py-2 px-4 border-b text-center">{room.rating}</td>
              {/* open status */}
              <td className="py-2 px-4 border-b text-center">
                {room.opening_hours.open_now ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <spoan className="text-red-500">Closed</spoan>
                )}
              </td>
              {/* favorites */}
              <td className="py-2 px-4 border-b text-center">
                <button className="p-2 border-2 border-[#FFD700] rounded-lg">
                  <Star />
                </button>
              </td>
              {/* details */}
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/rooms/${room.place_id}`}>
                  <button className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                    details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RoomsTableList;

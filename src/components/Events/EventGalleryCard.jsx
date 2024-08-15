/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Loader from "../CommonComponents/Loader";
import { Star } from "../CommonComponents/StarList";
import useGlobalContext from "../../context/global/useGlobalContext";



const EventGalleryCard = ({photo, address, name, isOpen}) => {
    const { isLoading } = useGlobalContext();

    if (isLoading) return <Loader />;
    return (
        <div className="grid grid-cols-2 p-4  overflow-hidden ">
      {/* row 1 */}
      <img
        className="col-span-2 row-start-1 rounded-lg mb-5 h-96 w-full object-cover"
        src={photo}
        alt=""
      />
      {/* row 2 */}
      {/* //* col 1 */}
      <div className="flex flex-col items-center justify-between p-4">
      <span className="text-3xl text-gray-100">123 Main St, Vacaville, CA, 95687</span>
      <span className="text-3xl text-gray-100">Aug, 20th, 5pm to 8pm</span>
      
      </div>
      {/* //* col 2 */}
      <div className="flex flex-col items-center justify-between text-gray-100">
        <div className="text-center">
          <h2 className="text-4xl mb-3">{name}</h2>
          <h3 className="text-2xl">{address}</h3>{" "}
        </div>
        <div className="mt-6 gap-12 flex justify-center ">
          <button className="p-2 border-2 border-[#FFD700] rounded-lg">
            <Star />
          </button>
          <Link to={`/events/:event`}>
            <button className="border h-full px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
              details
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
}
export default EventGalleryCard


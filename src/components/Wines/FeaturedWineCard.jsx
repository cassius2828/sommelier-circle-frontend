import { UilStar } from "@iconscout/react-unicons";

const FeaturedWineCard = ({
  title,
  img = "https://winenliquor.com/wp-content/uploads/Dark-Horse-Cabernet-Sauvignon-750ml-Wine-N-Liquor.jpg",
}) => {
  return (
    <div className="bg-white p-5 pb-12 max-w-[45rem] flex flex-col justify-center items-center relative rounded-md">
      <div className="w-1/2">
        <img src={img} alt="" />
      </div>
      <div className="stars-container flex text-gray-800 absolute left-12 bottom-32">
        <UilStar size="24" color="#FFD700" />
        <UilStar size="24" color="#FFD700" />
        <UilStar size="24" color="#FFD700" />
        <UilStar size="24" color="#FFD700" />
        <UilStar size="24" color="#FFD700" />
      </div>
      <h4 className="text-gray-800 text-3xl my-12">{title}</h4>
      <div className="tags text-gray-800 absolute right-12 gap-4 flex flex-wrap w-24 flex-col">
        <button className="px-4 py-2 border border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          tag
        </button>
        <button className="px-4 py-2 border border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          tag
        </button>
        <button className="px-4 py-2 border border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          tag
        </button>
        <button className="px-4 py-2 border border-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          tag
        </button>
      </div>
      <div className="btn-container mt-6 text-gray-800 flex w-full justify-evenly">
        <button className="border px-3 py-1  text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          buy
        </button>
        <button className="border px-3 py-1 text-2xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
          details
        </button>
      </div>
    </div>
  );
};

export default FeaturedWineCard;

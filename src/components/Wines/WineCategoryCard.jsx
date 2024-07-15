import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const WineCategoryCard = ({ img, title, path }) => {
  return (
    <div className="h-[40rem] bg-theme-darkest pb-5 rounded-md overflow-hidden flex flex-col items-center justify-around border">
      <div className="overflow-hidden w-full h-[30rem] ">
        <img className="w-full h-full object-cover " src={img} alt={title} />
      </div>
      <h3 className="text-gray-100 text-3xl my-12">{title}</h3>
      <Link to={path}>
        <button className="px-6 py-4 border rounded-md relative text-3xl text-gray-100 border-gray-100 capitalize hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 ease-in-out -translate-y-1">
          view bottles
        </button>
      </Link>
    </div>
  );
};
export default WineCategoryCard;

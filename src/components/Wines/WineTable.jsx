import { Link } from "react-router-dom";
import useGlobalContext from "../../context/global/useGlobalContext";

const WineTable = () => {
  const { winesByCategory } = useGlobalContext();

  return (
    <div className="overflow-x-auto mb-24">
      <table className="min-w-full bg-white border border-gray-200">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Grape</th>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Region</th>
            <th className="py-2 px-4 border-b">Critics' Score</th>{" "}
            <th className="py-2 px-4 border-b">Avg. Price / 750ml</th>
            <th className="py-2 px-4 border-b">Wine Details</th>
            <th className="py-2 px-4 border-b">Search Wine</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {winesByCategory?.map((wine, idx) => (
            <tr key={wine.name + idx} className="hover:bg-gray-100">
              {/* wine info */}
              <td className="py-2 px-4 border-b">
                <img
                  src={wine.img}
                  alt={wine.name}
                  className="w-12 h-12 rounded-md mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b">{wine.name}</td>
              {/* year */}
              <td className="py-2 px-4 border-b text-center">{wine.year}</td>
              {/* region */}
              <td className="py-2 px-4 border-b text-center">{wine.region}</td>
              {/* critic score */}
              <td className="py-2 px-4 border-b text-center">
                <button className="px-2 py-1 text-gray-100 bg-rose-900 rounded-3xl">
                  {wine.criticScore} / 100
                </button>
              </td>
              {/* avg price */}
              <td className="py-2 px-4 border-b text-center">{wine.region}</td>

              {/* action btns */}
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/wines/${wine._id}`}>
                  <button className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                    details
                  </button>
                </Link>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <Link to={wine.linkToPurchase}>
                  <button
                    type="button"
                    className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
                  >
                    search
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
export default WineTable;

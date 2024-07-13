import { Link } from "react-router-dom";
const wines = [
  {
    name: "Quinta do Noval Nacional Vintage Port",
    category: "Dessert",
    year: 2011,
    region: "Douro",
    winery: "Quinta do Noval",
    description:
      "A rich and intense wine with flavors of black fruit, chocolate, and spice. Full-bodied with a long, sweet finish.",
    tags: ["black fruit", "chocolate", "spice", "intense"],
    criticScore: 98,
    grape: "Touriga Nacional",
    avgPrice: 700,
    img: "https://example.com/images/noval.jpg",
    linkToPurchase: "https://example.com/purchase/noval",
  },
  {
    name: "Domaine de la Romanée-Conti Montrachet",
    category: "White",
    year: 2017,
    region: "Burgundy",
    winery: "Domaine de la Romanée-Conti",
    description:
      "An exquisite and complex wine with flavors of citrus, hazelnut, and mineral notes. Medium-bodied with a long, elegant finish.",
    tags: ["citrus", "hazelnut", "mineral", "complex"],
    criticScore: 99,
    grape: "Chardonnay",
    avgPrice: 3000,
    img: "https://example.com/images/montrachet.jpg",
    linkToPurchase: "https://example.com/purchase/montrachet",
  },
  {
    name: "Clos de la Roche Grand Cru",
    category: "Red",
    year: 2016,
    region: "Burgundy",
    winery: "Domaine Dujac",
    description:
      "A rich and elegant wine with flavors of black cherry, earth, and spice. Full-bodied with a long, smooth finish.",
    tags: ["black cherry", "earth", "spice", "elegant"],
    criticScore: 96,
    grape: "Pinot Noir",
    avgPrice: 400,
    img: "https://example.com/images/closdelaroche.jpg",
    linkToPurchase: "https://example.com/purchase/closdelaroche",
  },
];
const WineTable = () => {
  return (
    <div className="overflow-x-auto mb-24">
      <table className="min-w-full bg-white border border-gray-200">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Grape</th>
            <th className="py-2 px-4 border-b">Region</th>
            <th className="py-2 px-4 border-b">Critics' Score</th>{" "}
            <th className="py-2 px-4 border-b">Avg. Price / 750ml</th>
            <th className="py-2 px-4 border-b">Wine Details</th>
            <th className="py-2 px-4 border-b">Search Wine</th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {wines?.map((wine, idx) => (
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
                <button
                  onClick={() =>
                    alert(
                      "this will open your preferred search engine and query the bottle name"
                    )
                  }
                  type="button"
                  className="border px-3 py-1 text-xl rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
                >
                  search
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default WineTable;

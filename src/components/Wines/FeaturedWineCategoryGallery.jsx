import { Link } from "react-router-dom";
import WineCategoryCard from "./WineCategoryCard";

const FeaturedWineCategoryGallery = () => {
  return (
    <>
      <h2 className="text-gray-100 text-6xl text-center my-24">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mx-12 my-24">
        <WineCategoryCard
          title={`Regions`}
          img={`https://images.winalist.com/blog/wp-content/uploads/2024/02/26114506/AdobeStock_106808196-1500x1001.jpeg`}
          alt={``}
          path="/wines/regions"
        />
        <WineCategoryCard
          title={`Grapes`}
          // img={`https://www.monrovia.com/media/catalog/product/cache/e04ab064d507a8311b0c9a903817e129/r/e/rest_4_1_4171.jpeg`}
          img={`https://lazenne.com/cdn/shop/articles/Red_Grapes_a44fb818-6156-4955-b7db-3e7733cfac87.jpg?v=1537482047&width=2048
`}


          alt={``}
          path="/wines/grapes"
        />
        <WineCategoryCard
          title={`Search`}
          img={`https://californiagrown.org/wp-content/uploads/2021/10/brownbutterfig-094-scaled.jpg`}
          alt={``}
          path="/wines/search"
        />
        <WineCategoryCard
          title={`Spirits`}
          img={`https://www.foodandwine.com/thmb/9oNf0Ece0Jv1PeFalXXO1A0PDzo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Liquor-vs-Liqueur-vs-Spirit-FT-BLOG1122-88b33026a97d4554b0bf811c0ee0455b.jpg`}
          alt={``}
          path="/spirits"
        />
      </div>
      <div className="w-full text-center">
        <Link to={`/wines/search`}>
          <button className="px-6 py-4 border rounded-md relative text-3xl text-gray-100 border-gray-100 capitalize hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 ease-in-out -translate-y-1">
            see all selections
          </button>
        </Link>
      </div>
    </>
  );
};
export default FeaturedWineCategoryGallery;

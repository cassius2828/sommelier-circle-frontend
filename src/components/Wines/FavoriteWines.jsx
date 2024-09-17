import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// services
import { getFavoriteItems } from "../../services/favoritesService";
// components
import WineTable from "./WineTable";
import Loader from "../CommonComponents/Loader";
import useGlobalContext from "../../context/global/useGlobalContext";

const FavoriteWines = () => {
  const [wines, setWines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // hooks
  const { userId } = useParams();
  const { scrollToTop } = useGlobalContext();

  ///////////////////////////
  // Fetch Fav Wines
  ///////////////////////////
  useEffect(() => {
    const fetchFavoriteWines = async () => {
      setIsLoading(true);
      try {
        const data = await getFavoriteItems(userId, "wines");
        setWines(data);
      } catch (err) {
        console.error(err);
        console.log(`Unable to retrieve user's favorite blogs`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteWines();
    scrollToTop();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* overlay bg */}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>

      <h1 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-24">
        Favorite Wines
      </h1>
      <div className="flex flex-col items-center gap-12 my-12">
        <WineTable wines={wines} />
      </div>
    </>
  );
};
export default FavoriteWines;

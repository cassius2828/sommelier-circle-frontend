import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// services
import { getFavoriteItems } from "../../services/favoritesService";
// components
import WineTable from "./WineTable";
import Loader from "../CommonComponents/Loader";
import useGlobalContext from "../../context/global/useGlobalContext";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import useAuthContext from "../../context/auth/useAuthContext";
import NoContentFound from "../CommonComponents/NoContentFound";

const FavoriteWines = () => {
  const [wines, setWines] = useState(null);
  // hooks
  const { userId } = useParams();
  const { scrollToTop, isLoading, setIsLoading } = useGlobalContext();
  const { user, displayTargetedUsername } = useAuthContext();

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
        setWines([]);

      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteWines();
    scrollToTop();
  }, []);

  if (isLoading || wines === null) return <Loader />;
  if (!user && !isLoading)
    return (
      <>
        <PromptSignIn subject={"Favorite Wines"} />
      </>
    );
  if (wines.length < 1)
    return (
      <NoContentFound
        subject={"wines"}
        message="Add to your favorite wines by clicking the star icon on any wine card."
      />
    );

  return (
    <>
      {/* overlay bg */}
      <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>

      <h1 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-24">
        {`${displayTargetedUsername || ""} Favorite Wines`}
      </h1>
      <div className="flex flex-col items-center gap-12 my-12">
        <WineTable wines={wines} />
      </div>
    </>
  );
};
export default FavoriteWines;

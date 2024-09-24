import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// components
import { CriticCard } from "./CriticCard";
// service
import { getFavoriteItems } from "../../services/favoritesService";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import useAuthContext from "../../context/auth/useAuthContext";
import NoContentFound from "../CommonComponents/NoContentFound";

import Loader from "../CommonComponents/Loader";
import useGlobalContext from "../../context/global/useGlobalContext";

const FavoriteCritics = () => {
  const [critics, setCritics] = useState(null);
  // hooks
  const { userId } = useParams();
  const { user, fetchTargetUser, displayTargetedUsername } = useAuthContext();
  const { isLoading, setIsLoading } = useGlobalContext();
  // show target username


  ///////////////////////////
  // fetch favorite critics
  ///////////////////////////
  const fetchFavoriteCritics = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await getFavoriteItems(userId, "critics");
      setCritics(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service function to fetch favorite critics`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteCritics();
    fetchTargetUser(userId);
  }, []);
  if (isLoading || critics === null) return <Loader />;

  if (!user)
    return (
      <>
        <PromptSignIn subject={"Favorite Critics"} />
      </>
    );
  if (critics.length < 1)
    return (
      <NoContentFound
        subject={"critics"}
        message='Add to your favorite critcs by clicking the star on any critic card. See "explore critics" to find critics to add.'
      />
    );

  return (
    <>
      <>
        <h2 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80  mb-16 capitalize">
          {displayTargetedUsername} Total of{" "}
          <span className="text-theme-sand-dark">{critics.length}</span>{" "}
          favorited {critics.length > 1 ? "critics" : "critic"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {critics.map((critic) => (
            <CriticCard
              key={critic._id}
              id={critic._id}
              name={critic.name}
              awards={critic.awards}
              experience={critic.experience}
              img={critic.img}
            />
          ))}
        </div>
      </>
    </>
  );
};
export default FavoriteCritics;

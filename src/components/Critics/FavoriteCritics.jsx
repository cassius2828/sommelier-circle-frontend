import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// components
import { CriticCard } from "./CriticCard";
// service
import { getFavoriteItems } from "../../services/favoritesService";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import useAuthContext from "../../context/auth/useAuthContext";

const FavoriteCritics = () => {
  const [critics, setCritics] = useState([]);
  const { userId } = useParams();
  const { user } = useAuthContext();

  ///////////////////////////
  // fetch favorite critics
  ///////////////////////////
  const fetchFavoriteCritics = async () => {
    if (!user) return;
    try {
      const data = await getFavoriteItems(userId, "critics");
      setCritics(data);
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service function to fetch favorite critics`);
    }
  };

  useEffect(() => {
    fetchFavoriteCritics();
  }, []);
  if (!user)
    return (
      <>
        <PromptSignIn subject={"Favorite Critics"} />
      </>
    );
  return (
    <>
      {critics.length === 0 ? (
        <h2 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80 mb-16">
          Total of{" "}
          <span className="text-theme-sand-dark">{critics.length}</span>{" "}
          favorited {critics.length > 1 ? "critics" : "critic"}
        </h2>
      ) : (
        <>
          <h2 className="text-gray-100 text-6xl text-center pt-12 mt-52 md:mt-80  mb-16">
            Total of{" "}
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
      )}
    </>
  );
};
export default FavoriteCritics;

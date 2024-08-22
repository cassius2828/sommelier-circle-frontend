
import useAuthContext from "../../context/auth/useAuthContext";
import usePlacesContext from "../../context/places/usePlacesContext";
import Loader from "../CommonComponents/Loader";
import { LocationCard } from "./LocationCard";

export const LocationsGrid = () => {
  const { locations,isLoading } = usePlacesContext();

  const { user } = useAuthContext();
  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-y-8 gap-x-4">
      {locations?.map((location, idx) => (
        <LocationCard
          img={location.photos[0].photo_reference}
          photo={location.photo}
          rating={location.rating}
          name={location.name}
          address={location.vicinity}
          key={idx}
          isOpen={location.opening_hours.open_now}
          placeId={location.place_id}
          currentUser={user&&user}
        />
      ))}
    </div>
  );
};

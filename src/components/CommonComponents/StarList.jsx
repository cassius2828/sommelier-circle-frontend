import { UilStar } from "@iconscout/react-unicons";

const StarList = ({ absolute }) => {
  return (
    <div
      className={`stars-container flex text-gray-800 ${
        absolute ? "absolute left-12 bottom-32" : ""
      }`}
    >
      <UilStar size="24" color="#FFD700" />
      <UilStar size="24" color="#FFD700" />
      <UilStar size="24" color="#FFD700" />
      <UilStar size="24" color="#FFD700" />
      <UilStar size="24" color="#FFD700" />
    </div>
  );
};
export default StarList;

import FeaturedWineCard from "./FeaturedWineCard";

const FeaturedWineCardList = () => {
  return (
    <>
    <h2 className="text-6xl text-center text-gray-100 my-24">Featured Wines</h2>
    
    <div className="grid grid-cols-1 xl:grid-cols-3 p-5 my-12 gap-12 place-items-center xl:pl-40">
      <FeaturedWineCard title={`wine 1`} />
      <FeaturedWineCard title={`wine 2`} />
      <FeaturedWineCard title={`wine 3`} />
    </div>
    </>
  );
};
export default FeaturedWineCardList;

import FeaturedWineCard from "./FeaturedWineCard";

const FeaturedWineCardList = () => {
  return (
    <>
    <h2 className="text-6xl text-center text-gray-100 my-24">Featured Wines</h2>
    
    <div className="grid grid-cols-1 xl:grid-cols-3 p-5 my-12 gap-12 place-items-center xl:pl-40">
      <FeaturedWineCard wineId="66935a4bb38c5309ef548912" title={`Armand de Brignac Ace of Spades `} />
      <FeaturedWineCard wineId="66935a4bb38c5309ef548988" title={`Sassicaia`} />
      <FeaturedWineCard wineId="66935a4bb38c5309ef54890c" title={`Dom Pérignon`} />
    </div>
    </>
  );
};
export default FeaturedWineCardList;

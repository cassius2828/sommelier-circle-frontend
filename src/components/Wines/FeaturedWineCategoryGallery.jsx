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
        />
        <WineCategoryCard
          title={`Grapes`}
          img={`https://images.ctfassets.net/zpx0hfp3jryq/16cgILMm5YvngS6yWOHvwm/92d8dffe9005cab3eb1715875803f1e4/Merlot.jpg?fm=jpg&fl=progressive`}
          alt={``}
        />
        <WineCategoryCard
          title={`Pairings`}
          img={`https://californiagrown.org/wp-content/uploads/2021/10/brownbutterfig-094-scaled.jpg`}
          alt={``}
        />
        <WineCategoryCard
          title={`Spirits`}
          img={`https://www.foodandwine.com/thmb/9oNf0Ece0Jv1PeFalXXO1A0PDzo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Liquor-vs-Liqueur-vs-Spirit-FT-BLOG1122-88b33026a97d4554b0bf811c0ee0455b.jpg`}
          alt={``}
        />
      </div>
    </>
  );
};
export default FeaturedWineCategoryGallery;

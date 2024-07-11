import Hero from "../Hero/Hero";
import FeaturedWineCardList from "../Wines/FeaturedWineCardList";
import FeaturedWineCategoryGallery from "../Wines/FeaturedWineCategoryGallery";

// src/components/Landing.jsx
const Landing = () => {
  return (
    <div id="landing" className="pl-[10rem]">
      <Hero />
      <FeaturedWineCategoryGallery />
      <FeaturedWineCardList />
    </div>
  );
};
export default Landing;

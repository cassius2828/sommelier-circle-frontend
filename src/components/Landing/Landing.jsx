import LandingBlogs from "../Blogs/LandingBlogs";
import CriticsGallery from "../Critics";
import Footer from "../Footer";
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
      <LandingBlogs />
      <CriticsGallery />
      <Footer/>
    </div>
  );
};
export default Landing;

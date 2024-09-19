import { useEffect } from "react";
import LandingBlogs from "../Blogs/LandingBlogs/LandingBlogs";
import FeaturedCriticsGallery from "../Critics/FeaturedCritics";
import Footer from "../Footer";
import Hero from "../Hero/Hero";
import FeaturedWineCardList from "../Wines/FeaturedWineCardList";
import FeaturedWineCategoryGallery from "../Wines/FeaturedWineCategoryGallery";
import useBlogContext from "../../context/blog/useBlogContext";

// src/components/Landing.jsx
const Landing = () => {
  const { fetchCommunityBlogIds } = useBlogContext();
  useEffect(() => {
    fetchCommunityBlogIds();
  }, []);
  return (
    <div id="landing" className="md:pl-[10rem] mt-52 md:mt-0">
      <Hero />
      <FeaturedWineCategoryGallery />
      <FeaturedWineCardList />
      <LandingBlogs />
      <FeaturedCriticsGallery />
      <Footer />
    </div>
  );
};
export default Landing;

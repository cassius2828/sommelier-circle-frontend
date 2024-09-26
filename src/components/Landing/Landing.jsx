import { useEffect } from "react";
// context
import useBlogContext from "../../context/blog/useBlogContext";
import useGlobalContext from "../../context/global/useGlobalContext";
// components
import LandingBlogs from "../Blogs/LandingBlogs/LandingBlogs";
import FeaturedCriticsGallery from "../Critics/FeaturedCritics";
import Footer from "../Footer";
import Hero from "../Hero/Hero";
import FeaturedWineCardList from "../Wines/FeaturedWineCardList";
import FeaturedWineCategoryGallery from "../Wines/FeaturedWineCategoryGallery";
import { getUser } from "../../services/authService";

const Landing = () => {
  const { fetchCommunityBlogIds } = useBlogContext();
  const { scrollToTop } = useGlobalContext();
  const runGetUser = () => {
    console.log('running get user')
    getUser()

  }
  useEffect(() => {
    fetchCommunityBlogIds();
    runGetUser()
  }, []);

  useEffect(() => {
    scrollToTop();
  });

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

import { Link } from "react-router-dom";
import useAuthContext from "../../context/auth/useAuthContext";

const Hero = () => {
  const { user } = useAuthContext();
  return (
    <>
      <section
        id="Hero"
        className="bg-theme-dn text-gray-100 p-8 w-screen h-screen flex flex-col items-center justify-center relative"
      >
        <div className="relative md:right-28 z-10 flex flex-col items-center justify-around">
          <h1 className="text-7xl font-bold mb-4">
            Welcome to Sommelier Circle
          </h1>
          <p className="text-3xl mb-8">
            Discover, Share, and Celebrate the World of Fine Wines
          </p>
          {user ? (
            <Link to={`/profiles/${user._id}`}>
              <button className="px-6 py-4 border border-gray-100 text-gray-100 text-2xl rounded-md transition duration-300 hover:bg-gray-100 hover:text-gray-900">
                View Your Profile
              </button>
            </Link>
          ) : (
            <Link to={`/auth/signup`}>
              <button className="px-6 py-4 border border-gray-100 text-gray-100 text-2xl rounded-md transition duration-300 hover:bg-gray-100 hover:text-gray-900">
                Join Our Community
              </button>
            </Link>
          )}
        </div>

        <div className="overlay absolute w-screen h-screen"></div>
      </section>
    </>
  );
};

export default Hero;

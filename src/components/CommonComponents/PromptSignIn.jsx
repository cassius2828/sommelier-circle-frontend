import { Link } from "react-router-dom";

const PromptSignIn = ({ subject }) => {
  return (
    <div className="pt-32 mt-40 md:mt-80 min-h-screen w-screen ">
      <h1 className="text-4xl md:text-6xl text-gray-100 text-center font-serif">
        Please Sign in or Create an Accout to Access {subject}
      </h1>
      <div className="text-2xl md:text-4xl text-gray-100  transition-colors duration-200 flex gap-12 justify-center mt-20">
        <Link className="hover:text-theme-sand" to={`/auth/signin`}>
          Sign In
        </Link>
        <Link className="hover:text-theme-sand" to={`/auth/signup`}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};
export default PromptSignIn;

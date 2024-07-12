import { Link } from "react-router-dom";

const ShowCritic = () => {
  return (
    <div className="p-4 bg-neutral-900 flex max-w-[60rem] mt-32 mx-auto relative">
      <div className="w-1/2 ml-8">
        <img
          src="https://www.vin-x.com/thumbnails/0/4181/268/james-suckling.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col p-4 text-gray-200">
        <div className="w-3/4">
          <h3 className="text-4xl text-center">Name Doe</h3>
        </div>

        <div className="flex justify-between w-3/4 ml-auto mt-8">
          <h4 className="text-3xl text-center">Experience: </h4>{" "}
          <span className="text-xl"> x years</span>
        </div>

        <div className="flex justify-between w-3/4 ml-auto my-8">
          <h4 className="text-3xl text-center">Awards:</h4>
          <div>
            <AwardBtn />
            <AwardBtn />
          </div>
        </div>

        <p className="p-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          sint magni eaque harum similique illo soluta nesciunt, itaque eius
          dolorum rerum alias iure asperiores consectetur omnis! Adipisci nisi
          dicta ea.
        </p>
      </div>{" "}
      <Link to={`/critics`}>
        <button className="absolute  -bottom-20 left-1/2 -translate-x-1/2 text-3xl w-1/3 mx-auto mt-12 bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200">
          back to critics
        </button>
      </Link>
    </div>
  );
};
export default ShowCritic;

export const AwardBtn = () => {
  return (
    <span className="text-xl  mx-2  bg-gray-700 text-gray-100 px-2 py-1 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200">
      award
    </span>
  );
};

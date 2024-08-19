import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCriticDetails } from "../../services/criticService";

const ShowCritic = () => {
  const { criticId } = useParams();
  const [criticDetails, setCriticDetails] = useState({});

  const {
    img,
    name,
    awards,
    experience,
    bio = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          sint magni eaque harum similique illo soluta nesciunt, itaque eius
          dolorum rerum alias iure asperiores consectetur omnis! Adipisci nisi
          dicta ea.`,
  } = criticDetails;
  const fetchCriticDetails = async () => {
    try {
      const data = await getCriticDetails(criticId);
      if (data) {
        setCriticDetails(data);
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service file to get critic details`);
    }
  };

  useEffect(() => {
    fetchCriticDetails();
    console.log();
  }, []);

  return (
    <div className="p-4 bg-neutral-900 flex max-w-[90rem] mt-80 mx-auto relative">
      <div className="w-full ml-8">
        <img className="h-full object-cover"
          src={
            img
              ? img
              : `https://www.vin-x.com/thumbnails/0/4181/268/james-suckling.jpg`
          }
          alt=""
        />
      </div>
      <div className="flex flex-col p-4 text-gray-200">
        <div className="w-3/4">
          <h3 className="text-4xl text-center">{name}</h3>
        </div>

        <div className="flex justify-start items-center gap-12 w-3/4 ml-auto mt-8">
          <h4 className="text-3xl text-center">Experience: </h4>{" "}
          <span className="text-2xl"> {experience} years</span>
        </div>

        <div className="flex flex-col items-start justify-between w-3/4 ml-auto my-8">
          <h4 className="text-3xl text-center mb-8">Awards:</h4>

          <div className="flex flex-col gap-8 ">
            {awards?.map((award, idx) => (
              <AwardBtn key={award + idx} text={award} />
            ))}
          </div>
        </div>

        <p className="p-8 text-2xl">{bio}</p>
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

export const AwardBtn = ({ text }) => {
  return (
    <span className="text-xl  mx-2  bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200">
      {text}
    </span>
  );
};

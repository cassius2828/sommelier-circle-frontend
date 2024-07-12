import { Link } from "react-router-dom";

const ShowWine = () => {
  return (
    <div className="relative p-4 my-32 mx-auto border-4 overflow-hidden border-theme-sand-dark rounded-md border-3 bg-white max-w-[60rem]">
      <Link to={`/wines`}>
        <span className="absolute text-3xl cursor-pointer top-4 right-4">
          x
        </span>
      </Link>
      <img
        className="w-1/3 float-left mr-4 mb-4"
        src="https://media.istockphoto.com/id/157405246/photo/red-wine-with-property-release.jpg?s=612x612&w=0&k=20&c=L4XVBQKOB5VLFdVAu8cNAWhpowk91dNTCzI70bai2WQ="
        alt=""
      />
      <div>
        <h3 className="text-5xl mb-6">title llong ti`tle</h3>
        <div className="text-left text-2xl space-y-2">
          <div>
            <span className="font-bold">Region: </span>
            <span>Region Name</span>
          </div>
          <div>
            <span className="font-bold">Grape: </span>
            <span>Grape Variety</span>
          </div>
          <div>
            <span className="font-bold">Average Price: </span>
            <span>Price</span>
          </div>
          <div>
            <span className="font-bold">Winery: </span>
            <span>Winery Name</span>
          </div>
          <div>
            <span className="font-bold">Appearance: </span>
            <span>Appearance Description</span>
          </div>
          <div>
            <span className="font-bold">Critic Score: </span>
            <span>94</span>
          </div>
        </div>
        <p className="text-xl">
          DESCRIPTION Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Blanditiis ab nam adipisci error culpa mollitia dolorum odio quia
          suscipit reprehenderit. Officia nostrum reiciendis eligendi animi sit
          voluptatum ad, voluptate laudantium. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Minus similique architecto, praesentium
          quidem blanditiis alias cumque reiciendis veniam nesciunt iure
          assumenda, odio nam voluptatibus. Fuga dolore corporis aperiam tempore
          unde.
        </p>
      </div>
      <div className="tags absolute right-5 top-1/3 -translate-y-1/2 flex flex-col space-y-2">
        <button className=" rounded-lg border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out px-4 py-2">
          tag1
        </button>
        <button className=" rounded-lg border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out px-4 py-2">
          tag2
        </button>
        <button className=" rounded-lg border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out px-4 py-2">
          tag3
        </button>
        <button className=" rounded-lg border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-200 ease-in-out px-4 py-2">
          tag4
        </button>
      </div>
    </div>
  );
};

export default ShowWine;

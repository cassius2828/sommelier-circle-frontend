import { useState } from "react";

const ShowLocationImageCarousel = ({
  setShowCarousel,
  setIsImgHovered,
  photos,
}) => {
  const [indexOfPhotoArr, setIndexOfPhotoArr] = useState(0);
  const endOfPhotoArr = photos.length - 1;
  // handle carousel slide based on action
  const handleCarouselChange = (action) => {
    console.log("click");
    if (action === "next") {
      if (indexOfPhotoArr < endOfPhotoArr)
        setIndexOfPhotoArr((prev) => prev + 1);
      else setIndexOfPhotoArr(0);
    } else {
      if (indexOfPhotoArr > 0) setIndexOfPhotoArr((prev) => prev - 1);
      else setIndexOfPhotoArr(photos.length - 1);
    }
  };
  return (
    <div className="absolute w-full h-screen max-h-[50rem] bg-neutral-950">
      {/* conditionally render if photos are present or not */}
      {photos.length <= 0 ? (
        <>
          <h1 className="text-8xl text-center">No Photos Available</h1>
          <div className="flex justify-center mt-12  w-full ">
            <button
              onClick={() => {
                setShowCarousel(false);
                setIsImgHovered(false);
              }}
              className="  border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
            >
              back to details
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center pb-6 bg-neutral-950 text-4xl">
            <span>{indexOfPhotoArr + 1}</span> / <span>{photos.length}</span>
          </div>
          <img
            className="w-full h-full object-cover"
            src={photos[indexOfPhotoArr]}
            alt=""
          />{" "}
          <button
            onClick={() => {
              setShowCarousel(false);
              setIsImgHovered(false);
            }}
            className=" absolute top-[120%] left-1/2 -translate-x-1/2  border h-16 px-3 py-1 text-2xl rounded-md border-gray-100 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
          >
            back to details
          </button>
          {/* right arrow */}
          <svg
            onClick={() => handleCarouselChange("next")}
            className="rotate-180 absolute top-1/2 -right-20 cursor-pointer"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="20"
            id="arrow"
          >
            <path
              fillRule="evenodd"
              d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"
            ></path>
          </svg>
          {/* left arrow */}
          <svg
            onClick={() => handleCarouselChange("prev")}
            className=" absolute top-1/2 -left-20 cursor-pointer"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="20"
            id="arrow"
          >
            <path
              fillRule="evenodd"
              d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"
            ></path>
          </svg>
        </>
      )}
    </div>
  );
};

export default ShowLocationImageCarousel;

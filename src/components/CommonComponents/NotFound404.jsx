const NotFound404 = () => {
  return (
    <>
      <h1 className="flex flex-col absolute top-72 leading-[5rem] md:leading-normal z-20 text-5xl md:text-7xl text-gray-100 w-3/4 text-center left-1/2 -translate-x-1/2">
        <span className="mb-12">404 -- Not Found</span>{" "}
        <span className="font-serif">
          Much like the wine in first glass, this page has yet to be poured or
          it may not exist. But there are still many other pages to explore and
          enjoy!
        </span>
      </h1>
      <div className="h-screen w-screen flex justify-center items-center text-8xl text-gray-100 fixed">
        <img
          className="opacity-30 w-full h-full object-cover object-left"
          src="/images/6-wine-glasses-poured.jpg"
          alt="4 wine glasses being poured"
        />
      </div>
    </>
  );
};
export default NotFound404;

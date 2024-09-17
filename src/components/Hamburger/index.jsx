const Hamburger = ({ isOpen, setIsOpen }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute right-0 z-40">
      <button
        className="block  p-2  rounded focus:outline-none"
        onClick={toggleMenu}
      >
        <div
          className={`w-10 h-1 bg-gray-100  ease-in-out duration-500 transition-transform ${
            isOpen ? "transform rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-10 h-1 bg-gray-100 mt-1.5  ease-in-out duration-500 transition-opacity ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-10 h-1 bg-gray-100 mt-1.5  ease-in-out duration-500 transition-transform ${
            isOpen ? "transform -rotate-45 -translate-y-3" : ""
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Hamburger;

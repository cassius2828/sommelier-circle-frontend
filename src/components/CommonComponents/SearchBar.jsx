const SearchBar = () => {
  return (
    <div className="relative mb-8 w-1/2 mx-auto">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-4 text-gray-800 rounded-md"
      />
      <button className="absolute right-0 top-0 mt-4 mr-4">
        <svg
          className="h-6 w-6 text-gray-800"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.707 22.293l-6.387-6.386C18.177 14.187 19 12.176 19 10 19 4.486 14.514 0 9 0S-1 4.486-1 10s4.486 10 10 10c2.176 0 4.187-.823 5.907-2.321l6.386 6.387c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414zM2 10c0-3.859 3.141-7 7-7s7 3.141 7 7-3.141 7-7 7-7-3.141-7-7z" />
        </svg>
      </button>
    </div>
  );
};
export default SearchBar;

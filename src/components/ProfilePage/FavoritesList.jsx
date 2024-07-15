const FavoritesList = () => {
  return (
    <div className="col-start-1 col-span-1 row-start-1 w-3/4 mx-12 max-w-[50rem] rounded-md">
      <h2 className="text-5xl p-3 text-gray-100 bg-neutral-900 border-b">
        Favorites
      </h2>
      <ul className="w-full flex flex-col justify-start items-start">
        <li className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl">
          Wines
        </li>
        <li className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl">
          Blogs
        </li>
        <li className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl">
          Critics
        </li>
        <li className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl">
          Rooms
        </li>
        <li className="p-4 rounded-md hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl">
          Events
        </li>
      </ul>
    </div>
  );
};
export default FavoritesList;

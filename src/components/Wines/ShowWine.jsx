const ShowWine = () => {
  return (
    <div className="relative p-4 my-12 border border-theme-sand rounded-md border-3">
      <span className="absolute text-3xl">x</span>
      <img src="" alt="" />
      <div>
        <h3 className="text-3xl">title</h3>
        <div className="text-left text-2xl">
          <span>Region:</span>
          <span>Grape:</span>
          <span>Average Price:</span>
          <span>Winery:</span>
          <span>Appearance:</span>
          <span>Critic Score:</span>
        </div>
        <p className="text-xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          ab nam adipisci error culpa mollitia dolorum odio quia suscipit
          reprehenderit. Officia nostrum reiciendis eligendi animi sit
          voluptatum ad, voluptate laudantium. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Minus similique architecto, praesentium
          quidem blanditiis alias cumque reiciendis veniam nesciunt iure
          assumenda, odio nam voluptatibus. Fuga dolore corporis aperiam tempore
          unde.
        </p>
      </div>
      <div className="tags absolute right-0 top-1/2 -translate-y-1/2">
        <button className="border border-gray-100 text-gray-100 px-4 py-2">
          tags
        </button>
        <button className="border border-gray-100 text-gray-100 px-4 py-2">
          tags
        </button>
        <button className="border border-gray-100 text-gray-100 px-4 py-2">
          tags
        </button>
        <button className="border border-gray-100 text-gray-100 px-4 py-2">
          tags
        </button>
      </div>
    </div>
  );
};
export default ShowWine;

import { Link } from "react-router-dom";

export const FavoritesLink = ({ count, label, path }) => {
  return count ? (
    <Link
      className="p-4 hover:bg-neutral-600 bg-neutral-900 w-full text-gray-100 text-2xl"
      to={path}
    >
      <li>
        {label}: {count}
      </li>
    </Link>
  ) : (
    <span className="p-4 bg-neutral-900 w-full text-gray-400 text-2xl cursor-not-allowed">
      <li>{label}: 0</li>
    </span>
  );
};

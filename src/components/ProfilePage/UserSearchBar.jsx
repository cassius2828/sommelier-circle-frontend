import { useEffect, useState } from "react";
import { getSearchUsers } from "../../services/profileService";
import { Link } from "react-router-dom";

const UserSearchBar = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    console.log(query);
  };

  useEffect(() => {
    const fetchUsersFromSearch = async () => {
      try {
        const data = await getSearchUsers(query);
        setUsers(data);
      } catch (err) {
        console.error(err);
        console.log(`Error searching and displaying users | UserSearchBar.jsx`);
      }
    };
    fetchUsersFromSearch();
  }, [query]);
  return (
    <div className="flex flex-col items-center justify-start gap-4 mx-12 w-3/4 max-w-[50rem] bg-neutral-900 rounded-md">
      <h2 className="text-5xl p-3 text-gray-100 bg-neutral-900 border-b">
        Search Users
      </h2>
      <div className="flex justify-center items-center w-10/12">
        <div className="relative mb-8 w-full  items-center">
          {/* search bar */}
          <input
            name="query"
            value={query}
            onChange={handleChange}
            type="text"
            placeholder="Search"
            className="w-full p-4 text-gray-800 rounded-md"
          />
          {/* search icon */}
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

        {/* clear search btn */}
        <button
          onClick={() => setQuery("")}
          className=" border-neutral-200 border md:text-2xl ml-12 text-neutral-200 hover:bg-neutral-500 hover:border-neutral-500 transition-colors duration-200 ease-in-out px-4 py-2 mb-8 rounded-md "
        >
          clear search
        </button>
      </div>
      {/* conditional results bar */}
      <div className="w-full">
        {query.length !== 0 && (
          <ul className="flex flex-col items-center justify-start w-full">
            {users.map((user, idx) => (
              <Link className="w-full" key={user.username + idx} to={`/profiles/${user._id}`}>
                <li className="p-4 hover:bg-neutral-600 bg-neutral-800  w-full text-gray-100 text-2xl">
                  {user.username}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default UserSearchBar;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavListItem = ({ dropDownItems, listItemText }) => {
  const [isHovered, setIsHovered] = useState(false);
  const logout = dropDownItems[1].onClick;
  console.log(logout, "logout items");
  return (
    <div className="relative">
      <li
        className=" "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {listItemText}
        <ul
          className={`flex-col items-center justify-start bg-neutral-800 absolute -z-10  p-0 m-0  rounded-sm ${
            isHovered ? "h-auto flex" : "h-0 hidden"
          }  top-[99%] left-1/2 -translate-x-1/2`}
        >
          {dropDownItems.map((item, idx) => {
            return (
              <>
                {logout ? (
                  <Link onClick={logout ? () => logout() : null} to={"/"}>
                    <li className="dropdown-li hover:bg-neutral-700 text-gray-100 relative z-10 text-lg">
                      {item.text}
                    </li>
                  </Link>
                ) : (
                  <Link key={item.text + idx} to={item.path}>
                    <li className="dropdown-li hover:bg-neutral-700 text-gray-100 relative z-10 text-lg">
                      {item.text}
                    </li>
                  </Link>
                )}
              </>
            );
          })}
        </ul>
      </li>
    </div>
  );
};

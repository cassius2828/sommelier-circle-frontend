import { useState } from "react";
import { Link } from "react-router-dom";

export const NavListItem = ({ dropDownItems, listItemText, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const logout = dropDownItems[1]?.onClick;

  return (
    <div className="relative ">
      <li
        className=" "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {listItemText}
        <ul
          className={`flex-col items-center justify-start bg-neutral-800 absolute  z-20 p-0 m-0  rounded-sm ${
            isHovered ? "h-auto flex" : "h-0 hidden"
          }  top-[99%] left-1/2 -translate-x-1/2`}
        >
          {dropDownItems.map((item, idx) => {
            return (
              <>
                {item.text === "sign out" ? (
                  <Link
                    key={item.text + idx}
                    className="hover:bg-neutral-700 text-gray-100 w-full"
                    onClick={logout}
                    to={item.path}
                  >
                    <li className="dropdown-li  relative z-10 text-lg">
                      {item.text}
                    </li>
                  </Link>
                ) : (
                  <Link
                    className="hover:bg-neutral-700 text-gray-100 w-full"
                    onClick={() => {
                      handleClick();
                      setIsHovered(false);
                    }}
                    key={item.text + idx}
                    to={item.path}
                  >
                    <li className="dropdown-li  relative z-10 text-lg">
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

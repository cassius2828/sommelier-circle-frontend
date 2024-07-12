/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const years = [
  { year: "all", path: "/all" },
  { year: 2024, path: "/2024" },
  { year: 2023, path: "/2023" },
  { year: 2022, path: "/2022" },
  { year: 2021, path: "/2021" },
  { year: 2020, path: "/2020" },
  { year: 2019, path: "/2019" },
  { year: 2018, path: "/2018" },
  { year: 2017, path: "/2017" },
  { year: 2016, path: "/2016" },
  { year: 2015, path: "/2015" },
  { year: 2014, path: "/2014" },
  { year: 2013, path: "/2013" },
  { year: 2012, path: "/2012" },
  { year: 2011, path: "/2011" },
  { year: 2010, path: "/2010" },
  { year: 2009, path: "/2009" },
  { year: 2008, path: "/2008" },
  { year: 2007, path: "/2007" },
  { year: 2006, path: "/2006" },
  { year: 2005, path: "/2005" },
];

const WineFilterTabs = ({ query }) => {
  return (
    <div>
      <h1 className="text-6xl text-gray-100">Showing results for {query}</h1>
      <div className="flex flex-nowrap gap-4">
        {years.map((year, idx) => (
          <Link key={year.year + idx}>
            <button className="px-4 py-2 text-gray-100 border hover:bg-gray-100 hover:text-neutral-800">
              {year.year}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default WineFilterTabs;

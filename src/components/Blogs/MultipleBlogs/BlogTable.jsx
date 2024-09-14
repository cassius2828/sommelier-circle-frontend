import { Link } from "react-router-dom";

export const BlogTable = ({ blogs }) => {
  return (
    <div className="overflow-x-auto bg-[#111213]">
      <table className="min-w-full bg-[#111213] border border-gray-700">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Profile Image
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Author
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Blog Header
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Blog Title
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Date Created
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              View Blog
            </th>
            <th className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
              Share Blog
            </th>
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {blogs?.map((blog, idx) => (
            <tr key={blog.title + idx} className="hover:bg-gray-800">
              {/* author info */}
              <td className="py-2 px-4 border-b border-gray-700">
                <Link to={`/profiles/${blog.owner._id}`}>
                  <img
                    src={blog.owner.profileImg}
                    alt={blog.owner.username}
                    className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full mx-auto"
                  />
                </Link>
              </td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
                <Link to={`/profiles/${blog.owner._id}`}>
                  {blog.owner.username}
                </Link>
              </td>
              {/* header */}
              <td className="py-2 px-4 border-b border-gray-700 text-gray-100 md:text-xl">
                {blog.img && (
                  <img className="w-24 mx- my-8" src={blog.img} alt="" />
                )}
              </td>
              {/* title */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 md:text-xl">
                {blog.title}
              </td>
              {/* date */}
              <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-100 md:text-xl">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              {/* action btns */}
              <td className="py-2 px-4 border-b border-gray-700 text-center">
                <Link to={`/blogs/${blog._id}`}>
                  <button className="border px-3 py-1 md:text-xl rounded-md text-gray-100  border-gray-800 transition-colors duration-300 hover:bg-gray-900 hover:text-white">
                    view
                  </button>
                </Link>
              </td>
              <td className="py-2 px-4 border-b border-gray-700 text-center">
                <button
                  onClick={() =>
                    alert(
                      "this will copy the link and bring you to a social platform of your choosing"
                    )
                  }
                  type="button"
                  className="border px-3 py-1 md:text-xl text-gray-100 rounded-md border-gray-800 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
                >
                  share blog
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

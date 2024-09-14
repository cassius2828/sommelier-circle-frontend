import ShowBlog from "../../Blogs/ShowBlog"
import StylesColumn from "./StylesColumn"

const CategoryPage = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row w-full md:w-3/4 mx-auto justify-between gap-4">
      <ShowBlog propsBlogId={`6691aea098a19fabd8baa1d4`} />
      <StylesColumn />
    </div>{" "}
    <div className="fixed top-0 left-0 h-full w-full -z-10 bg-neutral-950"></div>
  </>
  )
}
export default CategoryPage
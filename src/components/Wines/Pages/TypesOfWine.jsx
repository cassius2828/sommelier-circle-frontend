import useGlobalContext from "../../../context/global/useGlobalContext"
import ShowBlog from "../../Blogs/ShowBlog"



const TypesOfWine = () => {
  return (
    <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-between gap-4">
        <ShowBlog/>
        <StylesColumn/>
    </div>
  )
}
export default TypesOfWine

export const StylesColumn = () => {
    const {wineStyles} = useGlobalContext()
  return (
    <div className="border">
        <h3 className="border-b">Styles</h3>
        <ul>

        </ul>
    </div>
  )
}
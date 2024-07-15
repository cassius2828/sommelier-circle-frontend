import useGlobalContext from "../../context/global/useGlobalContext"

const ScrollToTop = () => {
    const {scrollToTop} = useGlobalContext()
  return (
    <div onClick={scrollToTop} className="hover:bg-theme-sand rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center  fixed bottom-4 right-4 transition-colors duration-200 ease-in-out cursor-pointer">
<span className=" text-4xl font-extrabold relative top-1">&#8963;</span>

    </div>
  )
}
export default ScrollToTop
import { NavBarTop } from "../NavBar/NavBar"

const Header = () => {
  return (
    <header className="w-full h-52 bg-theme-darkest flex flex-col justify-center items-center shadow-slate-600 shadow-md relative">
        <h1 className="text-8xl text-center text-gray-100 relative -top-5">Sommelier Circle</h1>
<NavBarTop/>
    </header>
  )
}
export default Header
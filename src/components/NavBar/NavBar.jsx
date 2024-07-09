import { Link } from "react-router-dom"

const NavBar = ({ user, handleLogout}) => {
	return (
	  <>
		{user ? (
			<nav>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to={`/${user._id}`}>Profile</Link></li>
					<li><Link onClick={() => handleLogout()} to=''>Sign Out</Link></li>
				</ul>
			</nav>
		): (
			<nav>
			<ul>
				<li><Link to="/signin">Sign in</Link></li>
				<li><Link to='/signup'>Sign Up</Link></li>
			</ul>
		</nav>
		)}



		
	  </>
	)
  }
  export default NavBar
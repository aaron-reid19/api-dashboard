import { Link } from "react-router-dom"
const Navbar = () => {
    return ( 
        <header>
            <div className="container">
            < Link to='/'><h1>Dashboard</h1></Link>
            <nav>
            < Link to='/login'><h1>Login</h1></Link>
            < Link to='/register'><h1>Register</h1></Link>
            </nav>
        </div>
        </header>
        
     );
}
 
export default Navbar;
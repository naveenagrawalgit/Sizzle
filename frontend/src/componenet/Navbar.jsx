import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Navbar() {

  const {user,logout} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async ()=>{
    logout()
    navigate("/login")
  }

  return (
    <nav className='bg-amber-50 shadow-md p-4'>
        <div className='max-w-7xl flex justify-between items-center'>
        <Link to='/'>

        <h1>Sizzles</h1>
        
        </Link>

        <div className='flex gap-x-4'>
            
            { user 
            ? 
            <div><button className="rounded hover:pointer-events-auto" onClick={handleLogout}>Logout</button></div> 
            : 
            <><Link to='/login'>
            <button className=''>Login</button>
            </Link>

            <Link to="/register" >
            <button>Register</button>
            </Link></>}

        </div>
        </div>
    </nav>
  )
}

export default Navbar

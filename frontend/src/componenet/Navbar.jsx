import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HomeIcon, PlusCircleIcon, ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-amber-600 transition">
          <HomeIcon className="h-6 w-6 text-amber-500" />
          <span>Sizzles</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-x-4 items-center">
          {user ? (
            <div className="flex gap-x-4">
              {/* Add Recipe */}
              <Link to="/add-recipe">
                <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-600 transition">
                  <PlusCircleIcon className="h-5 w-5" />
                  Add Recipe
                </button>
              </Link>

              {/* Logout */}
              <button
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Login */}
              <Link to="/login">
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
                  <UserIcon className="h-5 w-5" />
                  Login
                </button>
              </Link>

              {/* Register */}
              <Link to="/register">
                <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition">
                  <UserIcon className="h-5 w-5" />
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

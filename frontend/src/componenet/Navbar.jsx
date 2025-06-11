import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HomeIcon, PlusCircleIcon, ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showCat, setShowCat] = useState(false);
  const [stars, setStars] = useState([]);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  const handleNavHover = () => {
    setShowCat(true);
    setTimeout(() => setShowCat(false), 15000); // Hide after 15 seconds
  };

  // Animation variants
  const navItem = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const nyanCatRun = {
    initial: { x: -250 },
    animate: { 
      x: "calc(100vw + 250px)",
      transition: {
        duration: 12,
        ease: "linear"
      }
    }
  };

  const starSparkle = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 relative overflow-hidden" onMouseEnter={handleNavHover}>
      {/* Sparkling stars */}
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            variants={starSparkle}
            className="absolute z-0 pointer-events-none"
            style={{ 
              left: star.x, 
              top: star.y,
              animationDelay: `${star.delay}s`
            }}
          >
            <div className="w-2 h-2 bg-black" style={{ 
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}></div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Nyan Cat animation */}
      <AnimatePresence>
        {showCat && (
          <motion.div
            key="nyan-cat"
            initial="initial"
            animate="animate"
            variants={nyanCatRun}
            className="absolute bottom-2 left-0 h-16 w-20 z-0 pointer-events-none"
          >
            <img 
              src="https://media.tenor.com/rI_0O_9AJ5sAAAAm/nyan-cat-poptart-cat.webp" 
              alt="Nyan Cat" 
              className="h-full w-full object-contain pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        {/* Logo with animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={navItem}
          transition={{ delay: 0.1 }}
        >
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-amber-600 transition">
            <motion.div whileHover={{ rotate: 10 }}>
              <HomeIcon className="h-6 w-6 text-amber-500" />
            </motion.div>
            <span>Sizzles</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.div 
          className="flex gap-x-4 items-center"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {user ? (
            <>
              {/* Add Recipe */}
              <motion.div variants={navItem}>
                <Link to="/add-recipe">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-600 transition"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    Add Recipe
                  </motion.button>
                </Link>
              </motion.div>

              {/* Logout */}
              <motion.div variants={navItem}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </motion.button>
              </motion.div>
            </>
          ) : (
            <>
              {/* Login */}
              <motion.div variants={navItem}>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    <UserIcon className="h-5 w-5" />
                    Login
                  </motion.button>
                </Link>
              </motion.div>

              {/* Register */}
              <motion.div variants={navItem} transition={{ delay: 0.2 }}>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                  >
                    <UserIcon className="h-5 w-5" />
                    Register
                  </motion.button>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
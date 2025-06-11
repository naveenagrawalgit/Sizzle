import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaUtensilSpoon, FaListUl, FaBookOpen, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/recipes/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-4">The requested recipe could not be loaded.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-6"
        >
          <IoIosArrowRoundBack className="text-2xl" />
          <span className="ml-1">Back</span>
        </motion.button>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {recipe.photoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-80 sm:h-96 overflow-hidden"
            >
              <img
                src={recipe.photoUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <motion.h1
                  variants={item}
                  className="text-3xl sm:text-4xl font-bold text-white capitalize"
                >
                  {recipe.title}
                </motion.h1>
                <motion.div variants={item} className="flex items-center mt-2">
                  <FaClock className="text-white mr-2" />
                  <span className="text-white">{recipe.cookingTime} minutes</span>
                  <span className="mx-3 text-white">•</span>
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full capitalize">
                    {recipe.category}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}

          <motion.div className="p-6 sm:p-8">
            <motion.div variants={item} className="mb-8">
              <h2 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                <FaUtensilSpoon className="text-blue-500 mr-3" />
                Ingredients
              </h2>
              <ul className="space-y-2 pl-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    variants={item}
                    className="flex items-start"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={item} className="mb-8">
              <h2 className="flex items-center text-xl font-bold text-gray-800 mb-4">
                <FaBookOpen className="text-blue-500 mr-3" />
                Instructions
              </h2>
              <motion.p
                variants={item}
                className="text-gray-700 whitespace-pre-line"
              >
                {recipe.instructions}
              </motion.p>
            </motion.div>

            {user && user._id === recipe.createdBy && (
              <motion.div
                variants={item}
                className="flex space-x-4 border-t border-gray-200 pt-6"
              >
                <Link to={`/edit-recipe/${id}`}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <FaEdit className="mr-2" />
                    Edit Recipe
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  <FaTrash className="mr-2" />
                  Delete Recipe
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;
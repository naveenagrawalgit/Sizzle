import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaUtensils, FaFire } from 'react-icons/fa';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Snack'
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/api/recipes/${category && category !== 'All' ? `?category=${category}` : ""}`
        );
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, [category]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Delicious Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing dishes for every occasion
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === cat 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
              key={cat}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </motion.div>
        )}

        {/* Recipe Grid */}
        <AnimatePresence>
          {!isLoading && (
            recipes.length > 0 ? (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {recipes.map((recipe) => (
                  <motion.div
                    variants={item}
                    key={recipe._id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link to={`/recipe/${recipe._id}`}>
                      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        {recipe.photoUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <motion.img
                              src={recipe.photoUrl}
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                                {recipe.category}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-5 flex-grow flex flex-col">
                          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                            {recipe.title}
                          </h2>
                          
                          <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <FaClock className="text-blue-500" />
                                <span>{recipe.cookingTime} mins</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FaFire className="text-red-500" />
                                <span>{recipe.calories || 'N/A'} kcal</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-gray-400 mb-4">
                  <FaUtensils className="inline-block text-5xl" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No recipes found
                </h3>
                <p className="text-gray-500">
                  {category === 'All' 
                    ? "We couldn't find any recipes." 
                    : `No ${category.toLowerCase()} recipes available.`}
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;
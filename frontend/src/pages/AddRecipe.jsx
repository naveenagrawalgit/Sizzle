import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaClock, FaImage, FaUtensils, FaBookOpen } from 'react-icons/fa';

function AddRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
    photoUrl: "",
    cookingTime: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    handleInputChange("ingredients", newIngredients);

    const lastIngredient = formData.ingredients[formData.ingredients.length - 1];
    if (error && lastIngredient.trim() !== '') {
      setError('');
    }
  };

  const addIngredient = () => {
    const lastIngredient = formData.ingredients[formData.ingredients.length - 1];
    if (lastIngredient.trim() !== '') {
      setError('');
      handleInputChange('ingredients', [...formData.ingredients, '']);
    } else {
      setError('Please fill in the last ingredient before adding a new one');
    }
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      handleInputChange("ingredients", newIngredients);
      
      const lastIngredient = formData.ingredients[formData.ingredients.length - 1];
      if (error && lastIngredient.trim() !== '') {
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post('/api/recipes', {
        title: formData.title,
        ingredients: formData.ingredients.filter(i => i.trim() !== ''),
        instructions: formData.instructions,
        category: formData.category,
        photoUrl: formData.photoUrl,
        cookingTime: formData.cookingTime ? Number(formData.cookingTime) : undefined
      });
      navigate('/');
    } catch (error) {
      console.error("Error during form submission", error);
      setError("Failed to add recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div 
          variants={item}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Recipe</h1>
          <p className="text-gray-600">Share your delicious creation with the world</p>
        </motion.div>

        <motion.form
          variants={container}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 sm:p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Title */}
          <motion.div variants={item} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="e.g. Creamy Garlic Pasta"
              required
            />
          </motion.div>

          {/* Ingredients */}
          <motion.div variants={item} className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <FaUtensils className="mr-2 text-blue-500" />
                Ingredients
              </label>
              <motion.button
                type="button"
                onClick={addIngredient}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FaPlus className="mr-1" />
                Add Ingredient
              </motion.button>
            </div>

            <AnimatePresence>
              {formData.ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center mb-2"
                >
                  <input
                    required
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                  />
                  {formData.ingredients.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="ml-2 p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                    >
                      <FaTrash />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Instructions */}
          <motion.div variants={item} className="mb-6">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaBookOpen className="mr-2 text-blue-500" />
              Instructions
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => handleInputChange("instructions", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[120px]"
              placeholder="Step-by-step instructions..."
              required
            />
          </motion.div>

          {/* Category */}
          <motion.div variants={item} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              onChange={(e) => handleInputChange("category", e.target.value)}
              value={formData.category}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </motion.div>

          {/* Cooking Time */}
          <motion.div variants={item} className="mb-6">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaClock className="mr-2 text-blue-500" />
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              value={formData.cookingTime}
              onChange={(e) => handleInputChange("cookingTime", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              min="1"
              required
            />
          </motion.div>

          {/* Photo URL */}
          <motion.div variants={item} className="mb-8">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaImage className="mr-2 text-blue-500" />
              Photo URL
            </label>
            <input
              type="text"
              value={formData.photoUrl}
              onChange={(e) => handleInputChange("photoUrl", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={item} className="text-center">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Recipe...
                </span>
              ) : (
                "Add Recipe"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default AddRecipe;

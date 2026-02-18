import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Favorites() {
  const STORAGE_KEY = "favoriteRecipes";
  const storedFavorites = localStorage.getItem(STORAGE_KEY);
  const [favorites, setFavorites] = useState(
    storedFavorites ? JSON.parse(storedFavorites) : [],
  );

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.idMeal !== idMeal,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-sm font-medium
                     text-gray-500 hover:text-amber-600 transition-colors"
        >
          Back to Home
        </NavLink>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-400">Your Favorite Recipes</span>
      </div>
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] 
                    gap-5 mt-5 ml-3 mr-3"
      >
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorite recipes yet.</p>
        ) : (
          favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="border border-gray-900 rounded p-4"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{meal.strMeal}</h3>
              <button
                onClick={() => removeFromFavorites(meal.idMeal)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded
                         hover:bg-red-700 transition-colors duration-200"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

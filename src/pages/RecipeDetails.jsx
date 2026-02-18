import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getMealById } from "../services/RecipeApi";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorite] = useState(false);
  const STORAGE_KEY = "favoriteRecipes";

  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const isFavorite = favorites.some(
        (meal) => meal.idMeal === mealDetails?.idMeal,
      );
      setIsFavorite(isFavorite);
    }
  }, [mealDetails]);

  const addToFavorites = () => {
    if (isFavorited) return;
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    if (!favorites.some((meal) => meal.idMeal === mealDetails.idMeal)) {
      favorites.push(mealDetails);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const data = await getMealById(id);
        if (data) {
          setMealDetails(data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  const ingredients = mealDetails
    ? Array.from({ length: 20 }, (_, i) => i + 1)
        .map((num) => ({
          ingredient: mealDetails[`strIngredient${num}`],
          measure: mealDetails[`strMeasure${num}`],
        }))
        .filter(({ ingredient }) => ingredient && ingredient.trim())
    : [];

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
        <span className="text-sm text-gray-400">Recipe Details</span>

        <NavLink
          to="/favorites"
          className="ml-auto text-sm font-medium text-gray-500
                     hover:text-amber-600 transition-colors"
        >
          View Favorites
        </NavLink>
      </div>

      <Loader loading={loading} />

      {mealDetails && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5 flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src={mealDetails.strMealThumb}
                  alt={mealDetails.strMeal}
                  className="w-full h-72 object-cover"
                />
              </div>
              {mealDetails.strYoutube && (
                <a
                  href={mealDetails.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-red-600
                   hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl 
                   shadow transition-colors duration-200"
                >
                  Watch Tutorial on YouTube
                </a>
              )}

              <div className="flex flex-wrap gap-2">
                <span
                  className="bg-amber-100 text-amber-800 text-sm font-medium 
                              px-4 py-1.5 rounded-full"
                >
                  🍽 {mealDetails.strCategory}
                </span>
                <span
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-4 
                                  py-1.5 rounded-full"
                >
                  🌍 {mealDetails.strArea}
                </span>
                <button
                  className={`px-4 text-white font-semibold py-1.5 rounded-lg 
                    transition-colors duration-200
                    ${
                      isFavorited
                        ? "bg-green-500 cursor-default"
                        : "bg-amber-500 hover:bg-amber-600"
                    }`}
                  onClick={addToFavorites}
                  disabled={isFavorited}
                >
                  {isFavorited ? "✓ Added to Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>

            <div className="lg:w-3/5 flex flex-col gap-7">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                  {mealDetails.strMeal}
                </h1>
                <div className="mt-2 h-1 w-16 bg-amber-500 rounded-full" />
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span>🧂</span> Ingredients
                </h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ingredients.map(({ ingredient, measure }, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 
                                  py-2 text-sm text-gray-700"
                    >
                      <span className="font-medium">{ingredient}</span>
                      {measure && (
                        <span className="text-gray-400 ml-1 text-xs">
                          — {measure}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span>📋</span> Instructions
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {mealDetails.strInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { searchMeals, getRandomMeal } from "../services/RecipeApi";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState(true);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setIsRecommended(false);

      const data = await searchMeals(searchTerm);

      if (data) {
        setMeals(data);
      } else {
        setMeals([]);
        setError("No recipes found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRandomMeals = async () => {
      try {
        setLoading(true);

        const results = await Promise.all([
          getRandomMeal(),
          getRandomMeal(),
          getRandomMeal(),
          getRandomMeal(),
        ]);

        const validMeals = results.filter(Boolean);
        setMeals(validMeals);
        setIsRecommended(true);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMeals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <Loader loading={loading} />

      {!loading && (
        <div className="mt-5 ml-3 mr-3">
          {isRecommended && (
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              Recommended Recipes
            </h2>
          )}

          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>

          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}

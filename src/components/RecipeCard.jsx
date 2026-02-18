import { NavLink } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <div className="border border-gray-900 rounded p-4">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded"
      />
      <h3>{meal.strMeal}</h3>
      <NavLink to={`/recipe/${meal.idMeal}`}>
        <button className="bg-amber-600 rounded p-2 w-full mt-2 text-white">
          View Recipe
        </button>
      </NavLink>
    </div>
  );
}

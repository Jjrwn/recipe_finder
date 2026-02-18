import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
});

async function fetchFromApi(endpoint) {
  try {
    const response = await api.get(endpoint);
    return response.data.meals || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

export async function searchMeals(query) {
  return fetchFromApi(`search.php?s=${query}`);
}

export async function getRandomMeal() {
  const meals = await fetchFromApi("random.php");
  return meals[0];
}

export async function getMealById(id) {
  return fetchFromApi(`lookup.php?i=${id}`);
}

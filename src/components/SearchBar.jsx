import { NavLink } from "react-router-dom";

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
            Recipe Finder
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Discover delicious recipes you like
          </p>
        </div>

        <NavLink
          to="/favorites"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm sm:text-base whitespace-nowrap self-start sm:self-auto"
        >
          <span>❤️</span>
          <span>Favorites</span>
        </NavLink>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Search for a recipe (e.g., chicken, pork)"
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm sm:text-base"
        />
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  );
}

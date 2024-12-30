"use client";
import React, { useState, useEffect } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("category");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          "https://qwikbuyz.onrender.com/api/products"
        );
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching all products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]); // Close suggestions on search
    try {
      let apiUrl = "";
      if (searchType === "category") {
        apiUrl = `https://qwikbuyz.onrender.com/api/products/query?category=${encodeURIComponent(
          query.toLowerCase()
        )}`;
      } else if (searchType === "name") {
        apiUrl = `https://qwikbuyz.onrender.com/api/products/query?title=${encodeURIComponent(
          query
        )}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const filteredSuggestions = allProducts
        .filter((product) =>
          searchType === "category"
            ? product.category.toLowerCase().includes(value.toLowerCase())
            : product.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((product) =>
          searchType === "name" ? product.title : product.category
        )
        .filter((item, index, self) => self.indexOf(item) === index) // Remove duplicates
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]); // Close suggestions on suggestion click
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Search Products
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-center space-x-6 mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="category"
                  checked={searchType === "category"}
                  onChange={() => setSearchType("category")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Search by Category</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="name"
                  checked={searchType === "name"}
                  onChange={() => setSearchType("name")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Search by Name</span>
              </label>
            </div>

            <div className="relative">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder={`Enter ${searchType}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
                      {suggestions.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {searchResults.map((product) => (
              <a
                key={product._id}
                href={`/products/${product.product_id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="relative pt-[100%]">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-blue-600 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../Product/ProductCard";
import { FiSearch } from "react-icons/fi";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
    if (query) {
      searchProducts(query);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const searchProducts = async (query) => {
    try {
      const response = await fetch(
        `/api/products?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error searching products:", error);
      // Mock search results for development
      setProducts(getMockSearchResults(query));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Products
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
          >
            <FiSearch size={24} />
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchParams.get("q") && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Search results for "{searchParams.get("q")}"
          </h2>
          <p className="text-gray-600 mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      {/* Results */}
      {!searchParams.get("q") ? (
        <div className="text-center py-12">
          <FiSearch size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Search for products
          </h3>
          <p className="text-gray-600">Enter a search term to find products</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <FiSearch size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            Try searching with different keywords or browse our categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="/category/men"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Men
            </a>
            <a
              href="/category/women"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Women
            </a>
            <a
              href="/category/kids"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Kids
            </a>
            <a
              href="/category/winter"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Winter
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Mock search results for development
const getMockSearchResults = (query) => {
  const mockProducts = [
    {
      _id: "1",
      title: "Winter Jacket",
      price: 2500,
      image: "https://via.placeholder.com/300x300",
      category: "winter",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.5,
      stock: 10,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Men's T-Shirt",
      price: 800,
      image: "https://via.placeholder.com/300x300",
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.2,
      stock: 25,
      createdAt: new Date().toISOString(),
    },
  ];

  // Filter based on search query
  return mockProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );
};

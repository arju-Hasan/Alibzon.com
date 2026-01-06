"use client";

import { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";

export default function CategoryPage({ category }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const categoryNames = {
    men: "Men's Collection",
    women: "Women's Collection",
    kids: "Kids Collection",
    winter: "Winter Collection",
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortBy, priceRange, selectedSizes]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Mock data for development
      setProducts(getMockProducts(category));
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
    setSortBy("newest");
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryNames[category] || "Products"}
        </h1>
        <p className="text-gray-600">
          Discover our latest {category} collection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>৳0</span>
                  <span>৳{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-2 text-sm border rounded-lg ${
                      selectedSizes.includes(size)
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quick Filters</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  On Sale
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  New Arrivals
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Top Rated
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  <FiList size={18} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria
              </p>
              <button onClick={clearFilters} className="mt-4 btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mock data for development
const getMockProducts = (category) => {
  const baseProducts = [
    {
      _id: "1",
      title: `${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Product 1`,
      price: 1500,
      image: "https://via.placeholder.com/300x300",
      category: category,
      sizes: ["S", "M", "L"],
      rating: 4.5,
      stock: 10,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: `${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Product 2`,
      price: 2500,
      image: "https://via.placeholder.com/300x300",
      category: category,
      sizes: ["M", "L", "XL"],
      rating: 4.2,
      stock: 15,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      title: `${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Product 3`,
      price: 800,
      image: "https://via.placeholder.com/300x300",
      category: category,
      sizes: ["XS", "S", "M"],
      rating: 4.8,
      stock: 20,
      createdAt: new Date().toISOString(),
    },
  ];

  return baseProducts;
};

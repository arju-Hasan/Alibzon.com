"use client";

import { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { FiFilter } from "react-icons/fi";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortBy, searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Mock data for development
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to Alibzon</h1>
          <p className="text-xl mb-6">
            Discover the latest fashion trends and lifestyle products
          </p>
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <FiFilter className="text-gray-600" size={20} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto"
          >
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="text-gray-600">
          Showing {filteredProducts.length} products
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}

// Mock data for development
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
  {
    _id: "3",
    title: "Women's Dress",
    price: 1500,
    image: "https://via.placeholder.com/300x300",
    category: "women",
    sizes: ["S", "M", "L"],
    rating: 4.8,
    stock: 15,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    title: "Kids Hoodie",
    price: 1200,
    image: "https://via.placeholder.com/300x300",
    category: "kids",
    sizes: ["XS", "S", "M"],
    rating: 4.6,
    stock: 20,
    createdAt: new Date().toISOString(),
  },
];

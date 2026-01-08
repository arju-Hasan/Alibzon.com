"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiStar,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";
import { useAppContext } from "../../app/providers";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { cartDispatch } = useAppContext();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
        setSelectedSize(data.product.sizes?.[0] || "");
        setSelectedColor(data.product.colors?.[0] || "");
        fetchSimilarProducts(data.product.category);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (category) => {
    try {
      const response = await fetch(
        `/api/products?category=${category}&limit=4`
      );
      const data = await response.json();

      if (data.success) {
        // Filter out current product
        const filtered = data.products.filter((p) => p._id !== productId);
        setSimilarProducts(filtered.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  const addToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error("Please select a size");
      return;
    }

    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    cartDispatch({ type: "ADD_TO_CART", payload: cartItem });
    toast.success("Added to cart!");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images?.[selectedImage]?.url || product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 fill-current" size={20} />
                <span className="ml-1 text-lg">{product.rating}</span>
                <span className="ml-2 text-gray-600">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span
                className={`${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg capitalize ${
                      selectedColor === color
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:border-primary"
              >
                <FiMinus size={16} />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="p-2 border border-gray-300 rounded-lg hover:border-primary"
                disabled={quantity >= product.stock}
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4">
            <a
              href="/cart"
              onClick={addToCart}
              disabled={product.stock === 0}
              className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {/* <FiShoppingCart size={20} /> */}
              <span>Buy Now</span>
            </a>
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FiShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:border-primary">
              <FiHeart size={20} />
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

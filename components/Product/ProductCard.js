"use client";

import Image from "next/image";
import Link from "next/link";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { useAppContext } from "../../app/providers";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { cartDispatch } = useAppContext();

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: product.sizes[0], // Default to first available size
      quantity: 1,
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

  return (
    <Link href={`/product/${product._id}`}>
      <div className="product-card group">
        {/* Product Image */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {product.stock} available
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="border border-gray-300 px-2 py-1 rounded"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-gray-400">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Link
              href={`/product/${product._id}`}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-center text-sm hover:bg-gray-200 transition-colors"
            >
              View More
            </Link>
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FiShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

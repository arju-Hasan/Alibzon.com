"use client";

import { useAppContext } from "../../app/providers";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, cartDispatch, auth } = useAppContext();

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(item);
      return;
    }

    cartDispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: item.id,
        size: item.size,
        quantity: newQuantity,
      },
    });
  };

  const removeItem = (item) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        id: item.id,
        size: item.size,
      },
    });
    toast.success("Item removed from cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.05; // 5% VAT
  const deliveryCharge = subtotal > 2000 ? 0 : 100; // Free delivery over 2000 BDT
  const total = subtotal + vat + deliveryCharge;

  const handleCheckout = () => {
    if (!auth.user) {
      window.location.href = "/login?redirect=/checkout";
      return;
    }
    window.location.href = "/checkout";
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <FiShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                  <p className="text-lg font-bold text-primary mt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="p-1 border border-gray-300 rounded hover:border-primary"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="p-1 border border-gray-300 rounded hover:border-primary"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (5%)</span>
                <span className="font-semibold">{formatPrice(vat)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-semibold">
                  {deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {deliveryCharge === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-green-800 text-sm">
                  🎉 You got free delivery!
                </p>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full btn-primary text-lg py-3"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="block text-center text-primary hover:underline mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

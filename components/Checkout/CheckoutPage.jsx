"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../../app/providers";
import Image from "next/image";
import { FiCreditCard, FiSmartphone, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    street: "",
    house: "",
    landmark: "",
    district: "",
    zone: "",
    area: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { cart, auth, cartDispatch } = useAppContext();

  useEffect(() => {
    if (!auth.user) {
      window.location.href = "/login?redirect=/checkout";
      return;
    }
    if (auth.loading) return; // wait until loading finishes

    if (!auth.user) {
      window.location.href = "/login?redirect=/checkout";
    }

    // Pre-fill address if available
    if (auth.user.address) {
      setAddressData({
        name: auth.user.name || "",
        phone: auth.user.phone || "",
        ...auth.user.address,
      });
    } else {
      setAddressData((prev) => ({
        ...prev,
        name: auth.user.name || "",
        phone: auth.user.phone || "",
      }));
    }
  }, [auth.loading, auth.user]);

  // useEffect(() => {
  //   // 1️⃣ Auth not initialized yet → wait
  //   if (auth.user === undefined || auth.loading) {
  //     return;
  //   }

  //   // 2️⃣ User not logged in → redirect
  //   if (auth.user === null) {
  //     window.location.href = "/login?redirect=/checkout";
  //     return;
  //   }

  //   // 3️⃣ User logged in → pre-fill address
  //   if (auth.user?.address) {
  //     setAddressData({
  //       name: auth.user.name || "",
  //       phone: auth.user.phone || "",
  //       ...auth.user.address,
  //     });
  //   } else {
  //     setAddressData((prev) => ({
  //       ...prev,
  //       name: auth.user.name || "",
  //       phone: auth.user.phone || "",
  //     }));
  //   }
  // }, [auth.user, auth.loading]);

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.05; // 5% VAT
  const deliveryCharge = subtotal > 2000 ? 0 : 100;
  const total = subtotal + vat + deliveryCharge;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const required = ["name", "phone", "street", "district", "zone", "area"];
    const missing = required.filter((field) => !addressData[field]);

    if (missing.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStep(2);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    setLoading(true);

    try {
      // Mock order placement - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart
      cartDispatch({ type: "CLEAR_CART" });

      toast.success("Order placed successfully!");
      window.location.href = "/order-success";
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some products to proceed with checkout
          </p>
          <a href="/" className="btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            1
          </div>
          <div
            className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-300"}`}
          ></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </div>
          <div
            className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-300"}`}
          ></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Delivery Address
              </h2>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressData.name}
                      onChange={(e) =>
                        setAddressData({ ...addressData, name: e.target.value })
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={addressData.phone}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          phone: e.target.value,
                        })
                      }
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressData.street}
                    onChange={(e) =>
                      setAddressData({ ...addressData, street: e.target.value })
                    }
                    className="input-field"
                    placeholder="House number and street name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      House/Apartment
                    </label>
                    <input
                      type="text"
                      value={addressData.house}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          house: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={addressData.landmark}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          landmark: e.target.value,
                        })
                      }
                      className="input-field"
                      placeholder="Nearby landmark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressData.district}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          district: e.target.value,
                        })
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zone *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressData.zone}
                      onChange={(e) =>
                        setAddressData({ ...addressData, zone: e.target.value })
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressData.area}
                      onChange={(e) =>
                        setAddressData({ ...addressData, area: e.target.value })
                      }
                      className="input-field"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("bkash")}
                >
                  <div className="flex items-center space-x-3">
                    <FiSmartphone className="text-pink-600" size={24} />
                    <div>
                      <h3 className="font-semibold">bKash</h3>
                      <p className="text-sm text-gray-600">
                        Pay with bKash mobile banking
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "nagad"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("nagad")}
                >
                  <div className="flex items-center space-x-3">
                    <FiSmartphone className="text-orange-600" size={24} />
                    <div>
                      <h3 className="font-semibold">Nagad</h3>
                      <p className="text-sm text-gray-600">
                        Pay with Nagad mobile banking
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center space-x-3">
                    <FiCreditCard className="text-blue-600" size={24} />
                    <div>
                      <h3 className="font-semibold">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">
                        Pay with Visa, Mastercard, etc.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center space-x-3">
                    <FiTruck className="text-green-600" size={24} />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back to Address
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary flex-1"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Review
              </h2>

              {/* Address Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <p className="text-sm text-gray-600">
                  {addressData.name}
                  <br />
                  {addressData.phone}
                  <br />
                  {addressData.street}, {addressData.house}
                  <br />
                  {addressData.area}, {addressData.zone}, {addressData.district}
                  {addressData.landmark && (
                    <>
                      <br />
                      Near {addressData.landmark}
                    </>
                  )}
                </p>
              </div>

              {/* Payment Method Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p className="text-sm text-gray-600 capitalize">
                  {paymentMethod.replace("-", " ")}
                </p>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  Back to Payment
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !agreeTerms}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="loading-spinner w-5 h-5"></div>
                      <span>Placing Order...</span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center space-x-3"
                >
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT (5%)</span>
                <span className="font-medium">{formatPrice(vat)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">
                  {deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

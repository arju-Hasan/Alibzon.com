"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../../app/providers";
import Link from "next/link";
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const { auth, authDispatch } = useAppContext();

  useEffect(() => {
    // Check authentication status with a delay to allow providers to load
    const checkAuth = () => {
      const token = localStorage.getItem("alibzon-token");
      const user = localStorage.getItem("alibzon-user");

      if (token && user) {
        const userData = JSON.parse(user);

        // Redirect admin users to admin dashboard
        if (userData.role === "admin") {
          window.location.href = "/admin";
          return;
        }

        // User is logged in
        setAuthLoading(false);
        if (!auth.user) {
          // Load auth state if not already loaded
          authDispatch({
            type: "LOGIN_SUCCESS",
            payload: { token, user: userData },
          });
        }
        fetchOrders();
      } else {
        // No authentication found, redirect to login
        setAuthLoading(false);
        if (typeof window !== "undefined") {
          window.location.href = "/login?redirect=/dashboard";
        }
      }
    };

    // Add a delay to prevent race condition with providers
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []); // Remove auth.user dependency to prevent loops

  // Separate effect to handle auth state changes
  useEffect(() => {
    if (auth.user && !loading) {
      fetchOrders();
    }
  }, [auth.user]);

  const fetchOrders = async () => {
    try {
      // Mock orders for now - replace with actual API call
      const mockOrders = [
        {
          _id: "1",
          orderItems: [
            {
              title: "Winter Jacket",
              price: 2500,
              quantity: 1,
              image: "https://via.placeholder.com/100x100",
            },
          ],
          totalPrice: 2500,
          status: "pending",
          createdAt: new Date().toISOString(),
          isPaid: false,
        },
        {
          _id: "2",
          orderItems: [
            {
              title: "Men's T-Shirt",
              price: 800,
              quantity: 2,
              image: "https://via.placeholder.com/100x100",
            },
          ],
          totalPrice: 1600,
          status: "completed",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          isPaid: true,
        },
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "packaging":
        return "text-blue-600 bg-blue-100";
      case "ongoing":
        return "text-purple-600 bg-purple-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!auth.user) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                <FiUser size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {auth.user.name}
                </h3>
                <p className="text-sm text-gray-600">{auth.user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                  activeTab === "orders"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiShoppingBag size={18} />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                  activeTab === "profile"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiUser size={18} />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                  activeTab === "address"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiMapPin size={18} />
                <span>Address</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My Orders
              </h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="loading-spinner"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="card p-8 text-center">
                  <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start shopping to see your orders here
                  </p>
                  <Link href="/" className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="card p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Order #{order._id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          <p className="text-lg font-bold text-primary mt-1">
                            {formatPrice(order.totalPrice)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.orderItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} ×{" "}
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <span
                          className={`text-sm ${
                            order.isPaid ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Payment Pending"}
                        </span>
                        <button className="text-primary hover:underline text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Profile Information
              </h2>
              <div className="card p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={auth.user.name}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={auth.user.email}
                      className="input-field"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={auth.user.phone}
                      className="input-field"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "address" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Delivery Address
              </h2>
              <div className="card p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        defaultValue={auth.user.address?.street || ""}
                        className="input-field"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        House/Apartment
                      </label>
                      <input
                        type="text"
                        defaultValue={auth.user.address?.house || ""}
                        className="input-field"
                        placeholder="House/Apartment number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        defaultValue={auth.user.address?.district || ""}
                        className="input-field"
                        placeholder="District"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zone
                      </label>
                      <input
                        type="text"
                        defaultValue={auth.user.address?.zone || ""}
                        className="input-field"
                        placeholder="Zone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area
                      </label>
                      <input
                        type="text"
                        defaultValue={auth.user.address?.area || ""}
                        className="input-field"
                        placeholder="Area"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      defaultValue={auth.user.address?.landmark || ""}
                      className="input-field"
                      placeholder="Nearby landmark (optional)"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Update Address
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

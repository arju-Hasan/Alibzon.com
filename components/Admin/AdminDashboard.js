"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../../app/providers";
import {
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const { auth } = useAppContext();

  useEffect(() => {
    fetchDashboardData();
  }, [auth.user]);

  const fetchDashboardData = async () => {
    try {
      // Mock data for development - replace with actual API calls
      const mockStats = {
        totalOrders: 156,
        totalUsers: 89,
        totalProducts: 45,
        totalRevenue: 125000,
        recentOrders: [
          {
            _id: "1",
            user: { name: "John Doe", email: "john@example.com" },
            totalPrice: 2500,
            status: "pending",
            createdAt: new Date().toISOString(),
            orderItems: [{ title: "Winter Jacket", quantity: 1 }],
          },
          {
            _id: "2",
            user: { name: "Jane Smith", email: "jane@example.com" },
            totalPrice: 1800,
            status: "packaging",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            orderItems: [{ title: "Men's T-Shirt", quantity: 2 }],
          },
          {
            _id: "3",
            user: { name: "Mike Johnson", email: "mike@example.com" },
            totalPrice: 3200,
            status: "ongoing",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            orderItems: [{ title: "Women's Dress", quantity: 1 }],
          },
        ],
        lowStockProducts: [
          {
            _id: "1",
            title: "Winter Jacket",
            stock: 3,
            price: 2500,
            category: "winter",
          },
          {
            _id: "2",
            title: "Kids Hoodie",
            stock: 5,
            price: 1200,
            category: "kids",
          },
        ],
      };

      setStats(mockStats);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {auth.user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiShoppingBag className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <FiTrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiUsers className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <FiTrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">+8%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiPackage className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <FiTrendingDown className="text-red-500 mr-1" size={16} />
            <span className="text-red-500">-2%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(stats.totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiDollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <FiTrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">+15%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-primary hover:underline text-sm"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      #{order._id}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.user.name}</p>
                  <p className="text-sm text-gray-500">
                    {order.orderItems[0].title}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-gray-600 hover:text-primary">
                    <FiEye size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <FiEdit size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Low Stock Alert</h2>
            <Link
              href="/admin/products"
              className="text-primary hover:underline text-sm"
            >
              Manage Products
            </Link>
          </div>

          <div className="space-y-4">
            {stats.lowStockProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-red-600 font-semibold">
                      Only {product.stock} left
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-gray-600 hover:text-primary">
                    <FiEye size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <FiEdit size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/add"
            className="card p-6 hover:shadow-lg transition-shadow text-center"
          >
            <FiPackage className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">
              Add New Product
            </h3>
            <p className="text-sm text-gray-600">
              Add a new product to your inventory
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="card p-6 hover:shadow-lg transition-shadow text-center"
          >
            <FiShoppingBag className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Orders</h3>
            <p className="text-sm text-gray-600">
              View and update order status
            </p>
          </Link>

          <Link
            href="/admin/users"
            className="card p-6 hover:shadow-lg transition-shadow text-center"
          >
            <FiUsers className="mx-auto text-primary mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600">
              View and manage user accounts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

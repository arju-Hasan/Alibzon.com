"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../../app/providers";
import {
  FiEye,
  FiEdit,
  FiSearch,
  FiFilter,
  FiDownload,
  FiPackage,
  FiTruck,
  FiCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { auth } = useAppContext();

  useEffect(() => {
    if (!auth.user || auth.user.role !== "admin") {
      window.location.href = "/login";
      return;
    }

    fetchOrders();
  }, [auth.user]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  const fetchOrders = async () => {
    try {
      // Mock data for development - replace with actual API call
      const mockOrders = [
        {
          _id: "1",
          user: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+8801234567890",
          },
          orderItems: [
            {
              title: "Winter Jacket",
              price: 2500,
              quantity: 1,
              size: "L",
              image: "https://via.placeholder.com/100x100",
            },
          ],
          shippingAddress: {
            name: "John Doe",
            phone: "+8801234567890",
            street: "123 Main St",
            district: "Dhaka",
            zone: "Dhanmondi",
            area: "Road 27",
          },
          totalPrice: 2500,
          status: "pending",
          paymentMethod: "cod",
          isPaid: false,
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          user: {
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+8801234567891",
          },
          orderItems: [
            {
              title: "Men's T-Shirt",
              price: 800,
              quantity: 2,
              size: "M",
              image: "https://via.placeholder.com/100x100",
            },
          ],
          shippingAddress: {
            name: "Jane Smith",
            phone: "+8801234567891",
            street: "456 Oak Ave",
            district: "Chittagong",
            zone: "Agrabad",
            area: "Commercial Area",
          },
          totalPrice: 1600,
          status: "packaging",
          paymentMethod: "bkash",
          isPaid: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          _id: "3",
          user: {
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+8801234567892",
          },
          orderItems: [
            {
              title: "Women's Dress",
              price: 1500,
              quantity: 1,
              size: "S",
              image: "https://via.placeholder.com/100x100",
            },
            {
              title: "Kids Hoodie",
              price: 1200,
              quantity: 1,
              size: "M",
              image: "https://via.placeholder.com/100x100",
            },
          ],
          shippingAddress: {
            name: "Mike Johnson",
            phone: "+8801234567892",
            street: "789 Pine St",
            district: "Sylhet",
            zone: "Zindabazar",
            area: "Residential Area",
          },
          totalPrice: 2700,
          status: "ongoing",
          paymentMethod: "card",
          isPaid: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Mock API call - replace with actual API
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiPackage size={16} />;
      case "packaging":
        return <FiPackage size={16} />;
      case "ongoing":
        return <FiTruck size={16} />;
      case "completed":
        return <FiCheck size={16} />;
      default:
        return <FiPackage size={16} />;
    }
  };

  if (!auth.user || auth.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage customer orders and track deliveries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="packaging">Packaging</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Export Button */}
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <FiDownload size={18} />
            <span>Export Orders</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order._id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.orderItems.length} item
                      {order.orderItems.length > 1 ? "s" : ""}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.orderItems[0].title}
                      {order.orderItems.length > 1 &&
                        ` +${order.orderItems.length - 1} more`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order._id, e.target.value)
                      }
                      className={`text-xs font-medium rounded-full px-3 py-1 border-0 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="packaging">Packaging</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.isPaid
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 capitalize">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                        className="text-gray-600 hover:text-primary"
                        title="View Order Details"
                      >
                        <FiEye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Orders will appear here when customers place them"}
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Order Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Order ID:</strong> #{selectedOrder._id}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {selectedOrder.isPaid ? "Paid" : "Unpaid"} (
                      {selectedOrder.paymentMethod})
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Name:</strong> {selectedOrder.user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.user.phone}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.phone}</p>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.area},{" "}
                      {selectedOrder.shippingAddress.zone}
                    </p>
                    <p>{selectedOrder.shippingAddress.district}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <p className="text-lg font-bold text-primary">
                      Total: {formatPrice(selectedOrder.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../../app/providers";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, authDispatch } = useAppContext();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-2">
            <Image
              src="/AZ.png"
              alt="Alibzon Admin"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div>
              <span className="text-2xl font-bold text-primary">Alibzon</span>
              <span className="block text-xs text-gray-500">Admin Panel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/admin"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Orders
            </Link>
            <Link
              href="/admin/users"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Users
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary flex items-center space-x-1"
            >
              <FiHome size={18} />
              <span className="hidden md:block">View Site</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              {auth.user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiUser size={18} />
                    <span className="hidden md:block">{auth.user.name}</span>
                    <span className="hidden md:block text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {auth.user.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 flex items-center space-x-1"
                  >
                    <FiLogOut size={18} />
                    <span className="hidden md:block">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                href="/admin"
                className="block py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="block py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/admin/orders"
                className="block py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/admin/users"
                className="block py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

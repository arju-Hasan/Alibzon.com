"use client";

import { useEffect } from "react";
import { useAppContext } from "../../app/providers";

export default function AdminCheck({ children }) {
  const { auth } = useAppContext();

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAdminAccess = () => {
      const token = localStorage.getItem("alibzon-token");
      const user = localStorage.getItem("alibzon-user");

      if (!token || !user) {
        window.location.href = "/login?redirect=" + window.location.pathname;
        return;
      }

      const userData = JSON.parse(user);
      if (userData.role !== "admin") {
        window.location.href = "/dashboard";
        return;
      }
    };

    const timer = setTimeout(checkAdminAccess, 100);
    return () => clearTimeout(timer);
  }, [auth.user]);

  // Show loading while checking
  if (!auth.user) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (auth.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You need admin privileges to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
}

"use client";

import { useAppContext } from "../providers";
import { useEffect, useState } from "react";

export default function TestRole() {
  const { auth } = useAppContext();
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("alibzon-token");
    const user = localStorage.getItem("alibzon-user");

    setLocalStorageData({
      token: token ? "Present" : "Not found",
      user: user ? JSON.parse(user) : "Not found",
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Role-Based Access Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Context State</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(auth, null, 2)}
          </pre>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">LocalStorage Data</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(localStorageData, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Role-Based Navigation Test
        </h2>
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-medium mb-2">Current User Role:</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                auth.user?.role === "admin"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {auth.user?.role || "Not logged in"}
            </span>
          </div>

          <div className="card p-4">
            <h3 className="font-medium mb-2">Expected Behavior:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Admin users should see "Admin" link in navbar</li>
              <li>
                • Admin users accessing /dashboard should redirect to /admin
              </li>
              <li>• Regular users should not see admin links</li>
              <li>
                • Regular users accessing /admin should redirect to /dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="btn-primary"
        >
          Test Dashboard Access
        </button>
        <button
          onClick={() => (window.location.href = "/admin")}
          className="btn-secondary"
        >
          Test Admin Access
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("alibzon-token");
            localStorage.removeItem("alibzon-user");
            window.location.reload();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Auth Data
        </button>
      </div>
    </div>
  );
}

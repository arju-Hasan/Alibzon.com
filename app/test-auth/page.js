"use client";

import { useAppContext } from "../providers";
import { useEffect, useState } from "react";

export default function TestAuth() {
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
      <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>

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

      <div className="mt-6 space-x-4">
        <button
          onClick={() => (window.location.href = "/register")}
          className="btn-primary"
        >
          Go to Register
        </button>
        <button
          onClick={() => (window.location.href = "/login")}
          className="btn-secondary"
        >
          Go to Login
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

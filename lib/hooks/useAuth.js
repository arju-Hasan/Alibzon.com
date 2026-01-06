"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../../app/providers";

export function useAuth(redirectTo = "/login") {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, authDispatch } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("alibzon-token");
        const user = localStorage.getItem("alibzon-user");

        if (token && user) {
          // If auth context doesn't have user but localStorage does, load it
          if (!auth.user) {
            authDispatch({
              type: "LOGIN_SUCCESS",
              payload: { token, user: JSON.parse(user) },
            });
          }
          setIsLoading(false);
        } else {
          // No authentication found
          const currentPath = window.location.pathname;
          window.location.href = `${redirectTo}?redirect=${currentPath}`;
        }
      } catch (error) {
        console.error("Auth check error:", error);
        const currentPath = window.location.pathname;
        window.location.href = `${redirectTo}?redirect=${currentPath}`;
      }
    };

    // Small delay to allow providers to load first
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [auth.user, authDispatch, redirectTo]);

  return {
    user: auth.user,
    isLoading,
    isAuthenticated: !!auth.user && !isLoading,
  };
}

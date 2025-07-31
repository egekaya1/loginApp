"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import { loadFromStorage, logout } from "@/lib/slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");  // Redirect to login page after logout
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 text-gray-900 dark:text-gray-100 font-sans">
        {isAuthenticated ? (
          <>
            <h1 className="text-4xl font-bold mb-4">
              Welcome back{role === "admin" ? ", Admin" : ""}!
            </h1>
            <p className="text-lg mb-6 max-w-md text-center">
              You are logged in as <strong>{role}</strong>.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-extrabold mb-6">Welcome to Auth Login</h1>
            <p className="text-lg mb-10 max-w-md text-center">
              Access your account by logging in below.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
            >
              Go to Login
            </Link>
          </>
        )}
      </main>
    </>
  );
}

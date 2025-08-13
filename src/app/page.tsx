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
    router.push("/login");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 text-gray-900 dark:text-gray-100 font-sans transition-colors">
        {isAuthenticated ? (
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Welcome back
              {role === "admin" && <span className="text-primary">, Admin</span>}!
            </h1>
            <p className="text-lg max-w-md">
              You are logged in as <strong className="capitalize">{role}</strong>.
            </p>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 transition text-white rounded-lg shadow-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-5xl font-extrabold tracking-tight">Welcome to Auth Login</h1>
            <p className="text-lg max-w-md">
              Access your account by logging in below.
            </p>
            <Link
              href="/login"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-lg font-semibold shadow-md transition"
            >
              Go to Login
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

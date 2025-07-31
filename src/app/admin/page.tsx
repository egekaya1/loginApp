"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function AdminPage() {
  const { role, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || role !== "admin") {
      router.replace("/login");
    }
  }, [role, isAuthenticated]);

  if (role !== "admin") return null;

  return <div className="p-6">Welcome, Admin!</div>;
}

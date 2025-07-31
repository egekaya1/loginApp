"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Navbar() {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      {role === "admin" && <Link href="/admin">Admin</Link>}
    </nav>
  );
}

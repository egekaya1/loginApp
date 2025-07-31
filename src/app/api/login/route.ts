import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("Received credentials:", email, password);

  try {
    const res = await fetch("https://f5q80hfi91.execute-api.eu-south-1.amazonaws.com/prod/get_users");
    
    if (!res.ok) {
      console.error("Failed to fetch user list");
      return NextResponse.json({ message: "Upstream error" }, { status: 502 });
    }

    const users = await res.json();

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const role = user.is_admin ? "admin" : "user";
    return NextResponse.json({ role });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

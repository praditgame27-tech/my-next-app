import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  // 🔐 mock admin (ชั่วคราว)
  if (email === "admin@example.com" && password === "1234") {
    cookies().set({
      name: "auth",
      value: "admin",
      httpOnly: true,
      path: "/",
    });

    return Response.json({ success: true });
  }

  return Response.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}

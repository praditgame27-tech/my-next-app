import { cookies } from "next/headers";

export async function POST() {
  // 🔥 ลบ cookie โดยระบุ option ให้ตรงกับตอน set
  cookies().set({
    name: "auth",
    value: "",
    path: "/",        // ต้องตรง
    maxAge: 0,        // สำคัญมาก
  });

  return Response.json({ success: true });
}

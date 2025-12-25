export const runtime = "nodejs";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export async function DELETE(req, { params }) {

  // อ่าน role จาก cookie
  const auth = cookies().get("auth")?.value;
  const role = auth ? JSON.parse(auth).role : "guest";

    // ❌ ไม่ใช่ admin → ห้ามลบ
  if (role !== "admin") {
    return Response.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }
  
  const client = await clientPromise;
  //const db = client.db("my-next-app");
  const db = client.db(process.env.MONGODB_DB);

  const result = await db
    .collection("contacts")
    .deleteOne({ _id: new ObjectId(params.id) });

  return Response.json({
    success: result.deletedCount === 1,
  });
}

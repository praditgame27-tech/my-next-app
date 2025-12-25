// app/api/contact/route.js
// POST เก็บข้อมูลเหมือนเดิม (ไม่ต้องแตะ)
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();

    // เชื่อมต่อ database
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // บันทึกข้อมูล contact ลง collection
    await db.collection("contacts").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({ 
      message: "Saved to database",
      success: true 
    });
  } catch (error) {
    console.error(error);
    return Response.json({ 
      message: "Failed to save", 
      success: false 
    }, { status: 500 });
  }
}

// 🔹 GET: ใช้ Mongo + แปลง data ให้เป็น JSON-friendly
// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_DB);

//     const contacts = await db
//       .collection("contacts")
//       .find(
//         {},
//         {
//           projection: {
//             name: 1,
//             email: 1,
//             message: 1,
//             createdAt: 1,
//           },
//         }
//       )
//       .sort({ createdAt: -1 })
//       .toArray();

//     // แปลง document ให้เหลือแค่ type ที่ serialize ได้
//     const cleanContacts = contacts.map((doc) => ({
//       // _id อาจไม่อยู่ใน projection ถ้าอยากใช้ก็เพิ่ม  _id: 1 ด้านบนได้
//       id: doc._id?.toString() ?? "",
//       name: doc.name ?? "",
//       email: doc.email ?? "",
//       message: doc.message ?? "",
//       createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
//     }));

//     return Response.json({
//       success: true,
//       data: cleanContacts,
//     });
//   } catch (error) {
//     console.error("GET /api/contact error:", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Failed to fetch contacts",
//       },
//       { status: 500 }
//     );
//   }
// }
export async function GET(req) {

  // อ่าน role จาก cookie
  const auth = cookies().get("auth")?.value;
  const role = auth ? JSON.parse(auth).role : "guest";

  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "new";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const query = q
    ? {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
          { message: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const sortOption = sort === "old" ? 1 : -1;

  const total = await db.collection("contacts").countDocuments(query);

  const data = await db
    .collection("contacts")
    .find(query)
    .sort({ createdAt: sortOption })
    .skip(skip)
    .limit(limit)
    .toArray();

  // return Response.json({
  //   success: true,
  //   data,
  //   total,
  //   page,
  //   totalPages: Math.ceil(total / limit),
  // });

  return Response.json({
    success: true,
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    role, // 👈 ส่ง role ไปให้ client ใช้ซ่อนปุ่ม
  });
}
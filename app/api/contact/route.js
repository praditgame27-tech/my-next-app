// app/api/contact/route.js
// POST เก็บข้อมูลเหมือนเดิม (ไม่ต้องแตะ)
import clientPromise from "@/lib/mongodb";

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
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const contacts = await db
      .collection("contacts")
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            message: 1,
            createdAt: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .toArray();

    // แปลง document ให้เหลือแค่ type ที่ serialize ได้
    const cleanContacts = contacts.map((doc) => ({
      // _id อาจไม่อยู่ใน projection ถ้าอยากใช้ก็เพิ่ม  _id: 1 ด้านบนได้
      id: doc._id?.toString() ?? "",
      name: doc.name ?? "",
      email: doc.email ?? "",
      message: doc.message ?? "",
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
    }));

    return Response.json({
      success: true,
      data: cleanContacts,
    });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch contacts",
      },
      { status: 500 }
    );
  }
}
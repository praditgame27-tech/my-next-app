// app/api/contact/route.js

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

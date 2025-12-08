// app/api/contact/route.js

// ฟังก์ชันนี้จะทำงานเมื่อมีการส่ง POST มาที่ /api/contact
export async function POST(request) {
  // อ่านข้อมูล JSON ที่ส่งมาจากหน้า Contact
  const body = await request.json();

  // ตัวอย่าง debug — ดูข้อมูลใน console ของ server
  console.log("Received Form:", body);

  // ตอบกลับไปยัง client ว่ารับข้อมูลแล้ว
  return Response.json({
    message: "Contact form received!",
    data: body,
  });
}

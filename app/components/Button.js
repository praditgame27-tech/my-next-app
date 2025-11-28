// app/components/Button.js

"use client";
// ระบุว่าไฟล์นี้ก็เป็น Client Component เช่นกัน
// (เผื่ออนาคตมี event หรือ state เพิ่มในปุ่ม)

export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick} // รับฟังก์ชันจาก props (ฝั่ง client → client OK)
      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
    >
      {text}
    </button>
  );
}

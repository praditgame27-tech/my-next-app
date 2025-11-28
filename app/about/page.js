// app/about/page.js

"use client"; 
// บอก Next.js ว่าไฟล์นี้เป็น Client Component 
// สามารถใช้ event handler, useState, useEffect, alert ฯลฯ ได้

import Button from "../components/Button"; 
// เรียกใช้ปุ่มจากไฟล์ components/Button.js

// นี่คือ React Component สำหรับหน้า /about
export default function AboutPage() {

  // ฟังก์ชันนี้จะถูกใช้เมื่อผู้ใช้กดปุ่ม
  const handleClick = () => {
    alert("You clicked the button from About Page!");
  };

  // JSX ที่จะถูกแสดงใน browser
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-50">
      {/* หัวข้อของหน้า */}
      <h1 className="text-4xl font-bold text-blue-600">
        About Page 🧑‍💻
      </h1>

      {/* เรียกใช้ปุ่ม พร้อมส่ง props text และ onClick ลงไป */}
      <Button text="Click Me!" onClick={handleClick} />
    </main>
  );
}

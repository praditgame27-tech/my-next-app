"use client";
// ต้องเป็น client component เพราะจะมีฟอร์มที่ interactive

import { useState } from "react"; 
// ใช้เก็บข้อมูล input จากผู้ใช้

export default function ContactPage() {
  // สร้าง state เก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ฟังก์ชันนี้จะรันทุกครั้งที่มีการพิมพ์ใน input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันนี้จะรันเมื่อกดส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันเว็บรีเฟรช
    console.log("Form Submitted:", formData);
    alert("ข้อมูลถูกส่งเรียบร้อย! (ยังไม่เก็บลงฐานข้อมูล)");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">Contact Us 📩</h1>

      {/* ฟอร์ม */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md flex flex-col gap-4"
      >
        {/* ชื่อ */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-3 rounded-lg"
          value={formData.name}
          onChange={handleChange}
        />

        {/* อีเมล */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />

        {/* ข้อความ */}
        <textarea
          name="message"
          placeholder="Message"
          className="border p-3 rounded-lg"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          ส่งข้อความ
        </button>
      </form>
    </main>
  );
}

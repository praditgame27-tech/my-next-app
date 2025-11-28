"use client";  
// ใช้ events & Link → ต้องเป็น Client Component

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex gap-6">
      {/* ลิงก์ไปหน้า Home */}
      <Link href="/" className="hover:text-yellow-300">
        Home
      </Link>
      {/* ลิงก์ไปหน้า About */}
      <Link href="/about" className="hover:text-yellow-300">
        About
      </Link>
    </nav>
  );
}

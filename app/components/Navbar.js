// app/components/Navbar.js

"use client";
// Navbar ต้องรันบนฝั่ง client เพราะใช้ usePathname + onClick/Link

import Link from "next/link";
import { usePathname } from "next/navigation"; 
// hook เอาไว้ดู path ปัจจุบัน เช่น "/", "/about"

// กำหนดเมนูนำทางไว้ใน array แบบนี้
const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // อนาคตจะเพิ่มเมนูอื่น เช่น Products, Contact ตรงนี้ได้เลย
];

export default function Navbar() {
  // ดึง path ปัจจุบันจาก Next.js
  const pathname = usePathname();

  return (
    // แถบ navbar ด้านบนสุด
    <nav className="w-full border-b bg-white">
      {/* กล่องด้านใน กำหนดให้กึ่งกลางหน้าจอ เหมือนเว็บ e-commerce */}
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        
        {/* โลโก้ / ชื่อแบรนด์ */}
        <div className="text-xl font-bold tracking-tight">
          <span className="text-blue-600">My</span>
          <span className="text-gray-900">Shop</span>
        </div>

        {/* กล่องเก็บเมนูด้านขวา */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            // เช็คว่าเมนูนี้ตรงกับหน้า current path ไหม
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative pb-1 text-sm font-medium"
              >
                {/* ตัวอักษรของเมนู */}
                <span
                  className={
                    // ถ้า active ให้ใช้สีเข้ม + ถ้าไม่ active ใช้สีเทา
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900 transition-colors"
                  }
                >
                  {item.label}
                </span>

                {/* เส้นใต้เมนู เวลา active (สไตล์ e-commerce) */}
                {isActive && (
                  <span
                    className="absolute left-0 top-full h-0.5 w-full rounded-full bg-blue-600"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

"use client"; 
// บอก Next.js ว่าไฟล์นี้ต้องรันฝั่ง client
// เพราะใช้ useState, useEffect, onChange, onClick

import { useEffect, useState } from "react";

export default function ContactPage() {

  // 📋 เก็บข้อมูล contact ที่ดึงมาจาก API
  const [contacts, setContacts] = useState([]);

  // 🔎 คำค้นหาที่พิมพ์ในช่อง search
  const [q, setQ] = useState("");

  // 🔃 รูปแบบการเรียง
  const [sort, setSort] = useState("new");

  // 📄 หน้าปัจจุบัน
  const [page, setPage] = useState(1);

  // 📊 จำนวนหน้าทั้งหมด (มาจาก server)
  const [totalPages, setTotalPages] = useState(1);

  // เมื่อ q, sort หรือ page เปลี่ยน → ดึงข้อมูลใหม่
  useEffect(() => {
    fetchData();
  }, [q, sort, page]);

  // ฟังก์ชันดึงข้อมูลจาก API
  const [role, setRole] = useState("guest");
  const fetchData = async () => {
    const res = await fetch(
      `/api/contact?q=${q}&sort=${sort}&page=${page}&limit=5`
    );

    const result = await res.json();

    // อัปเดต state
    setContacts(result.data);
    setTotalPages(result.totalPages);
    setRole(result.role);
  };

  return (
    <div className="bg-white p-6 rounded shadow">

      {/* หัวข้อหน้า */}
      <h2 className="text-xl font-semibold mb-4">
        Contact Messages
      </h2>

      {/* 🔎 Search + Filter */}
      <div className="flex gap-3 mb-4">

        {/* ช่องค้นหา */}
        <input
          placeholder="Search..."
          className="border p-2 flex-1"
          value={q}
          onChange={(e) => {
            setPage(1);              // เปลี่ยน search → กลับหน้าแรก
            setQ(e.target.value);    // เก็บค่าที่พิมพ์
          }}
        />

        {/* ตัวเลือกการเรียง */}
        <select
          value={sort}
          onChange={(e) => {
            setPage(1);              // เปลี่ยน sort → กลับหน้าแรก
            setSort(e.target.value);
          }}
          className="border p-2"
        >
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>

      {/* 📋 ตารางแสดงข้อมูล */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((item, index) => (
            <tr key={item._id} className="border-b">
              <td>{(page - 1) * 5 + index + 1}</td>
              <td>{item.name}</td>

              {/* 📧 Email + Copy */}
              <td className="flex items-center gap-2">
                {item.email}

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.email);
                    alert("Copied!");
                  }}
                  className="text-xs text-blue-600 underline"
                >
                  Copy
                </button>
              </td>

              <td className="max-w-xs truncate">{item.message}</td>

              {/* 🗑️ Delete */}
              <td>

                {role === "admin" && (
                <button
                  onClick={async () => {
                    if (!confirm("Delete this contact?")) return;
                    await fetch(`/api/contact/${item._id}`, { method: "DELETE" });
                    fetchData();
                  }}
                  className="text-xs text-red-600 underline"
                >
                  Delete
                </button>
              )}

              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* 📄 Pagination */}
      <div className="flex justify-between mt-4">

        {/* ปุ่มย้อนกลับ */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {/* แสดงเลขหน้า */}
        <span>
          Page {page} / {totalPages}
        </span>

        {/* ปุ่มถัดไป */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

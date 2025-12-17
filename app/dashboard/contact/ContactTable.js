// app/dashboard/contact/ContactTable.js
"use client";

import { useState } from "react";

export default function ContactTable({ contacts: initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts ?? []);
  const [deletingId, setDeletingId] = useState(null);

  // format date: ใช้ toLocaleString เพื่อรวมเวลาได้
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("th-TH", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // copy email to clipboard + small UI feedback
  const handleCopy = async (email) => {
    try {
      await navigator.clipboard.writeText(email || "");
      // simple feedback — คุณสามารถเปลี่ยนเป็น toast library ได้ภายหลัง
      alert("Copied email to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      alert("Copy failed");
    }
  };

  // delete handler: call DELETE /api/contact/[id]
  const handleDelete = async (id) => {
  console.log("DELETE id from UI =", id, typeof id);

  if (!confirm("Delete this message?")) return;

  try {
    setDeletingId(id);

    const res = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();
    console.log("DELETE response =", json);

    if (json.success) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert(json.message || "Delete failed");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Delete failed");
  } finally {
    setDeletingId(null);
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-3">#</th>
            <th className="py-3 px-3 text-sm font-semibold text-gray-700">Name</th>
            <th className="py-3 px-3 text-sm font-semibold text-gray-700">Email</th>
            <th className="py-3 px-3 text-sm font-semibold text-gray-700">Message</th>
            <th className="py-3 px-3 text-sm font-semibold text-gray-700">Date</th>
            <th className="py-3 px-3 text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(contacts) && contacts.length > 0 ? (
            contacts.map((item, index) => (
              <tr key={item.id ?? index} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-3 text-gray-500">{index + 1}</td>

                <td className="py-2 px-3 max-w-xs truncate">{item.name}</td>

                <td className="py-2 px-3 max-w-xs truncate">
                  <div className="flex items-center gap-3">
                    <span className="truncate">{item.email}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.email)}
                      className="text-blue-500 hover:text-blue-700 text-sm underline"
                    >
                      Copy
                    </button>
                  </div>
                </td>

                <td className="py-2 px-3 max-w-md truncate">{item.message}</td>

                <td className="py-2 px-3 text-gray-600 text-sm">{formatDate(item.createdAt)}</td>

                <td className="py-2 px-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="text-red-600 hover:underline text-sm"
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                No messages
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar / Header */}
      <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
        <h1 className="font-semibold text-lg">Admin Dashboard</h1>

        {/* 🔴 Logout Button */}
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </header>

      {/* Page content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

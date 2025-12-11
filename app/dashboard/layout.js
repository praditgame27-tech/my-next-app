// app/dashboard/layout.js

export default function DashboardLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        {children}
      </div>
    </main>
  );
}

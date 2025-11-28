// app/page.js

// นี่คือ "หน้าแรก" ของเว็บ (route "/")
// ใน Next.js (App Router) จะใช้ฟังก์ชันเป็น React Component
export default function Home() {
  // React Component ต้อง return JSX (หน้าตาเหมือน HTML)
  return (
    // fragment <></> ใช้ครอบ element หลายตัวโดยไม่ต้องมี div เพิ่ม
    <>
      {/* ส่วนหัวของหน้า */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* กล่องหลัก */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          {/* ข้อความหัวเรื่อง */}
          <h1 className="text-3xl font-bold mb-4">
            Welcome, Future Full Stack Developer! 🚀
          </h1>

          {/* ข้อความอธิบาย */}
          <p className="text-gray-700 mb-4">
            คุณกำลังเรียน Next.js อยู่ในโปรเจคแรกของคุณแล้ว 🎉
          </p>

          {/* ข้อความสถานะการเรียน */}
          <p className="text-sm text-gray-500 mb-6">
            Progress: Day 4 — Next.js Project Setup
          </p>

          {/* ปุ่มตัวอย่าง */}
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            เริ่มเส้นทาง Full Stack
          </button>
        </div>
      </main>
    </>
  );
}


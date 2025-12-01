// app/layout.js

import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "My Full Stack App",
  description: "Learning Next.js step by step!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Navbar แสดงทุกหน้า */}
        <Navbar />
        {/* เนื้อหาของแต่ละหน้า */}
        <div className="mx-auto max-w-5xl px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}

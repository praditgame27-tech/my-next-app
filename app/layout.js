import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "My Full Stack App",
  description: "Learning Next.js step by step!",
};

// Layout คือโครงสร้างหลักของทุกหน้า
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ใช้ Navbar ทุกหน้า */}
        <Navbar />
        {/* เนื้อหาของแต่ละหน้า */}
        {children}
      </body>
    </html>
  );
}

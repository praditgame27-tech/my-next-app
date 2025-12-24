// export default function Page() {
//   return <div>...</div>;
// }
import { redirect } from "next/navigation";

export default function DashboardPage() {
  // 🔁 เมื่อเข้า /dashboard ให้เด้งไปหน้า contact ทันที
  redirect("/dashboard/contact");
}

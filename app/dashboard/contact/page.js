// app/dashboard/contact/page.js

import clientPromise from "@/lib/mongodb";

// ใช้ Server Component → ดึงข้อมูลตรงจาก DB
export default async function ContactDashboard() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  // ดึงข้อมูล
  const contacts = await db
    .collection("contacts")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        Contact Messages
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Message</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.email}</td>
              <td className="py-2">{item.message}</td>
              <td className="py-2">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

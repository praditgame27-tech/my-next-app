// app/dashboard/contact/page.js
import clientPromise from "@/lib/mongodb";
import ContactTable from "./ContactTable"; // relative path — ต้องถูกต้อง

export default async function ContactDashboard() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const contacts = await db
    .collection("contacts")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  // แปลงให้เป็น plain object เพื่อปลอดภัย (ObjectId → string, Date → ISO)
  const cleaned = contacts.map((doc) => ({
  id: doc._id.toString(),   // ✅ ต้องเป็น string
  name: doc.name ?? "",
  email: doc.email ?? "",
  message: doc.message ?? "",
  createdAt: doc.createdAt
    ? new Date(doc.createdAt).toISOString()
    : null,
}));



  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>
      <ContactTable contacts={cleaned} />
    </div>
  );
}

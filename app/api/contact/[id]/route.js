export const runtime = "nodejs";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db("my-next-app");

  const result = await db
    .collection("contacts")
    .deleteOne({ _id: new ObjectId(params.id) });

  return Response.json({
    success: result.deletedCount === 1,
  });
}

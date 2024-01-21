// import React from "react";

// function Page({ params }: { params: { id: string } }) {
//   return (
//     <div>
//       <div>Page {params.id}</div>
//     </div>
//   );
// }

// export default Page;

export async function GET(request: Request) {
  const id = request.url.split("/").pop() as string;
  const originalUrl = await search(id);
  return Response.redirect(originalUrl);
}

import { MongoClient } from "mongodb";
const { DATABASE_URL, SERVER_URL } = process.env;
async function search(id: string) {
  const cutFront10 = id;
  const db = await MongoClient.connect(DATABASE_URL as string);
  const query = { cutFront10: { $eq: cutFront10 } };
  const queryed = await db
    .db("caplink")
    .collection("map")
    .find(query)
    .toArray();
  const { originalUrl } = queryed[0];
  await db.close();
  return originalUrl;
}

const { DATABASE_URL } = process.env;

// import mongoose from "mongoose";
// const connect = async () => {
//   const conn = await mongoose
//     .connect((DATABASE_URL + "caplink") as string)
//     .catch((error) => console.log(error));
//   const UserSchema = new mongoose.Schema({
//     firstname: String,
//     lastname: String,
//     age: String,
//   });
//   const User = mongoose.models.User || mongoose.model("User", UserSchema);
//   return { conn, User };
// };
// export async function POST(request: Request) {
//   const { User } = await connect();
//   const req = await request.formData();
//   const firstname = req.get("fname");
//   const lastname = req.get("lname");
//   const age = req.get("age");
//   const data = { firstname, lastname, age };
//   console.log(request.body);
//   return Response.json(await User.create(data));
//   return Response.json({});
// }

import crypto from "crypto";
function toSHA256(text: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(text, "utf-8");
  return hash.digest("hex");
}

import { MongoClient } from "mongodb";
export async function POST(request: Request) {
  const { originalUrl } = await request.json();
  const sha256: string = toSHA256(originalUrl);
  const cutFront10 = sha256.slice(0, 10);
  const shortUrl = process.env.SERVER_URL + cutFront10;
  const map = { cutFront10, originalUrl };
  const db = await MongoClient.connect(DATABASE_URL as string);
  await db.db("caplink").collection("map").insertOne(map);
  await db.close();
  return new Response(JSON.stringify(shortUrl), {
    headers: {
      "content-type": "application/json",
    },
  });
  //   return Response.redirect(SERVER_URL as string);
}

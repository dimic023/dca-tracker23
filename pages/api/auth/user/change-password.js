import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../../helpers/auth";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const secret = process.env.SECRET;
  const token = await getToken({ req, secret });
  //const session = await getSession({ req: req });

  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = token.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.toString();

  const client = await MongoClient.connect(DB_CONNECTION_STRING);

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password" });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;

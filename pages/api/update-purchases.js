import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const secret = process.env.SECRET;
  const token = await getToken({ req, secret });

  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = token.email;
  const purchases = req.body;

  const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.toString();

  const client = await MongoClient.connect(DB_CONNECTION_STRING);

  //const client = await MongoClient.connect(DB_CONNECTION_STRING);

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { purchases: purchases } }
  );
  client.close();
  res.status(200).json({ message: "Purchase removed" });
}

export default handler;

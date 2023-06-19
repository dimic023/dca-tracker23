import { getSession } from "next-auth/react";

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated to get purchases" });
      return;
    }

    const userEmail = session.user.email;

    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.toString();

    const client = await MongoClient.connect(DB_CONNECTION_STRING);

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    const purchases = user.purchases;
    client.close();
    res.status(200).json(purchases);
  }
}

export default handler;

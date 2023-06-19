import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

function dateIsValid(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const date = new Date(dateStr);

  const timestamp = date.getTime();

  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateStr);
}

async function handler(req, res) {
  if (req.method === "POST") {
    //const session = await getSession({ req });
    //const session = await getServerSession(req, res, authOptions);
    const secret = process.env.SECRET;
    const token = await getToken({ req, secret });

    if (!token) {
      res.status(401).json({ message: "Not authenticated" });

      return;
    }

    const userEmail = token.email;
    const data = req.body;
    const { id, date, purchaseValue, coinPrice } = data;

    if (!dateIsValid(date)) {
      res.status(422).json({ message: "Invalid date" });

      return;
    }

    if (
      !id ||
      !date ||
      !purchaseValue ||
      purchaseValue < 0 ||
      purchaseValue > 100000000 ||
      !coinPrice ||
      coinPrice < 0
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.toString();

    const client = await MongoClient.connect(DB_CONNECTION_STRING);

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    const purchase = {
      id: id,
      date: date,
      coin: "BTC",
      purchaseValue: purchaseValue,
      coinPrice: coinPrice,
      amount: (purchaseValue / coinPrice).toFixed(6),
      //valueNow: purchaseValue,
      //roi: 0,
    };

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $push: { purchases: purchase } }
    );
    client.close();
    res.status(200).json({ message: "Purchase added" });
  }
}

export default handler;

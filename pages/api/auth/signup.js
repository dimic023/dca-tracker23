import { MongoClient } from "mongodb";

import { hashPassword } from "../../../helpers/auth";
import generateHash from "../../../helpers/generateHash";
import sendConfirmationEmail from "../../../helpers/mailer";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long",
      });
      return;
    }

    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.toString();

    const client = await MongoClient.connect(DB_CONNECTION_STRING);

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      isActive: false,
      purchases: [],
    });

    //console.log(newUser.insertedId);
    const codesCollection = client.db().collection("codes");

    const hash = generateHash();

    const newCodes = await codesCollection.insertOne({
      email: email,
      code: hash,
      //  + 24 hours
      expires: new Date().getTime() + 86400000,
    });

    //new Promise(async (res, rej) => {
    await sendConfirmationEmail(email, hash);
    //});

    //console.log(email, hashedPassword);
    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}

export default handler;

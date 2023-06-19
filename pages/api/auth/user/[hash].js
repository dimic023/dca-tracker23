import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const hash = req.query.hash;

    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.toString();

    const client = await MongoClient.connect(DB_CONNECTION_STRING);

    const codesCollection = client.db().collection("codes");

    const code = await codesCollection.findOne({ code: hash });

    if (!code) {
      res.status(404).json({ message: "Not found." });
      client.close();
      return;
    }

    const dateNow = new Date().getTime();

    if (dateNow > code.expires) {
      res.status(404).json({ message: "Code is no longer valid" });
      client.close();
      return;
    }

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: code.email });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    if (user.isActive) {
      res.status(404).json({ message: "User is already active" });
      client.close();
      return;
    }

    const result = await usersCollection.updateOne(
      { email: code.email },
      { $set: { isActive: true } }
    );

    const removedCode = await codesCollection.findOneAndDelete({ code: hash });
    //console.log(result);
    client.close();
    res
      .status(200)
      .json({ message: "User Activated, you can now login into your account" });
  }
}

export default handler;

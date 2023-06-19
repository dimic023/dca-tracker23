import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { verifyPassword } from "../../../helpers/auth";
//import type { NextAuthOptions } from 'next-auth';

export default NextAuth({
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const DB_CONNECTION_STRING =
          process.env.DB_CONNECTION_STRING.toString();

        const client = await MongoClient.connect(DB_CONNECTION_STRING);

        //const { email, password } = credentials;

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({ email: credentials.email });

        if (!user || !user.isActive) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});

// export const authOptions: NextAuthOptions = {
//   // your configs
// }

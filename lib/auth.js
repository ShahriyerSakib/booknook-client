import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;
const client = globalForMongo._mongoClient || new MongoClient(process.env.MONGODB_URI);
if (!globalForMongo._mongoClient) globalForMongo._mongoClient = client;
const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

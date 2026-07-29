import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export default async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db("benefits");
    console.log("Connected to mongoDB (DB: benefits)");
    return db;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

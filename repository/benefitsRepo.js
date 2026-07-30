import connectToMongo from "../db/mongo.js";

const db = await connectToMongo();
const collection = await db.collection("benefits");

export default {
  create: async (data) => {
    const result = await collection.insertOne(data);
    return result.insertedId.toString();
  },
  find: async (filter) => {
    const benefit = await collection.findOne(filter);
    return benefit || null;
  },
  update: async (soldierId, data) => {
    const result = await collection.updateOne({ soldierId }, {$set: {data}});
    return result.modifiedCount > 0;
  },
};

import connectToMongo from "../db/mongo.js";

const db = await connectToMongo()
const collection = await db.collection('benefits')

export default {
    create: (data) => {
        const result = await collection.insertOne(data)
        return result.insertedId.toString()
    },
    find: (filter) => {
        const benefit = await collection.findOne(filter)
        return benefit || null
    },
    updateHistory: (soldierId, data) => {
        const result = await collection.updateOne({soldierId}, {$push: {history: data}})
        return result.modifiedCount > 0

    }
}
import connectToMongo from "../db/mongo.js";

const db = await connectToMongo()
const collection = await db.collection('benefits')

export default {
    create: (data) => {
        const result = await collection.insertOne(data)
        return result.insertedId.toString()
    },
    find: (id) => {
        const benefit = await collection.findOne({id: id})
        return benefit || null
    },
    update: (id, data) => {
        const result = await collection.updateOne({id: id}, data)
        return result.modifiedCount > 0

    }
}
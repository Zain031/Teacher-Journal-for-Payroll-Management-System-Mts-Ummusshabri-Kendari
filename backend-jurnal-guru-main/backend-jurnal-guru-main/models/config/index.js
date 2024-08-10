import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const uri =
  process.env.MONGODB_URI || null;

if (!uri) {
  throw new Error("MONGO_DB Connection is not provided");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//To Export db and db.getCollection()
export const db = client.db("JurnalGuru");

export const getCollection = (collectionName) => {
  return db.collection(collectionName);
};

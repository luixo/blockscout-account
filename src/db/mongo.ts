import { Db, MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DATABASE;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error(
    "Please add your Mongo URI to MONGODB_URI environment variable"
  );
}
if (!database) {
  throw new Error(
    "Please add your Mongo DB to MONGODB_DATABASE environment variable"
  );
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const withMongo = async <T>(handler: (db: Db) => Promise<T>) => {
  const client = await clientPromise;
  const db = client.db();
  try {
    return handler(db);
  } catch (e) {
    console.error("MongoDB error:", e);
    throw e;
  }
};

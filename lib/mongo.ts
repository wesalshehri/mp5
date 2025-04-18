import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// 👇 Extend the global type for dev use
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// 🚨 Throw if env is missing
if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

// ✅ Cache the connection in development to avoid multiple clients
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

import { MongoClient } from 'mongodb'
import { config } from '../../config/config';

const uri = config.db || process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Mongo DB URI not configured');
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
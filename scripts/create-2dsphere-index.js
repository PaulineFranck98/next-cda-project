const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); 
    const collection = db.collection('locations');
    await collection.createIndex({ geo: "2dsphere" });
    console.log('2dsphere index created on geo');
  } finally {
    await client.close();
  }
}

main().catch(console.error);
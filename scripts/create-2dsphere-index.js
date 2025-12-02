const { MongoClient } = require('mongodb');

async function createIndex() {
	const client = new MongoClient(process.env.DATABASE_URL);
	try {
		await client.connect();
		const db = client.db();
		const collection = db.collection('locations');
		await collection.createIndex({ geo: "2dsphere" });

	} finally {
		await client.close();
	}
}

createIndex().catch(console.error);
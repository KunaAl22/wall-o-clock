const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URL;

let client; 

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("connected");
  }
  return client;
}

async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = undefined;
  }
}

module.exports = { connectToDatabase, closeDatabaseConnection };





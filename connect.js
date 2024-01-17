const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.ATLAS_URI; // Replace with your actual connection string
const databaseName = 'FNA'; // Replace with your actual database name

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Express app connected to MongoDB!');
});

async function connectToDb() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(databaseName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err; // Re-throw to let the server handle the error
  }
}

async function listCollectionNames(db) {
  try {
    const collectionCursor = await db.listCollections();
    const collectionNames = [];
    await collectionCursor.forEach(collection => {
      collectionNames.push(collection.name);
    });
    return collectionNames;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function retrieveDataFromCollection(db, collectionName) {
  try {
    const data = await db.collection(collectionName).find().toArray();
    return data;
  } catch (err) {
    console.error(`Error retrieving data from ${collectionName}:`, err);
    throw err;
  }
}

async function retrieveDataWithCondition(db, collectionName, condition) {
  try {
    const data = await db.collection(collectionName).find(condition).toArray();
    return data;
  } catch (err) {
    console.error(`Error retrieving data from ${collectionName} with condition:`, err);
    throw err;
  }
}

app.get('/collection-names', async (req, res) => {
  try {
    const db = await connectToDb();
    const collectionNames = await listCollectionNames(db);
    res.json({ collectionNames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing collection names');
  }
});

app.get('/retrieve-data/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const db = await connectToDb();
    const data = await retrieveDataFromCollection(db, collectionName);
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

app.get('/retrieve-company-data/:collectionName/:field/:value', async (req, res) => {
  try {
    const { collectionName, field, value } = req.params;
    const db = await connectToDb();
    const condition = { [field]: value };
    const data = await retrieveDataWithCondition(db, collectionName, condition);
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data with condition');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

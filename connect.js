const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Import the crypto module
dotenv.config();

const uri = process.env.ATLAS_URI;
const databaseName = 'FNA';
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Set the secret key as an environment variable
process.env.JWT_SECRET = secretKey;

async function connectToDb() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(databaseName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
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

app.post('/login', async (req, res) => {
  const { CID, UID, password } = req.body;

  try {
    const db = await connectToDb();

    // Find the company by CID
    const company = await db.collection('Companies').findOne({ CID });

    if (!company) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Find the user within the Users array
    const user = company.Users.find((user) => user.UID === UID);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with CID and UID in the payload
    const token = jwt.sign({ userId: user._id, CID, UID }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/insert-user/:CID', async (req, res) => {
  const { CID } = req.params;
  const { UID, password } = req.body;

  try {
    const db = await connectToDb();

    // Check if the CID exists
    const company = await db.collection('Companies').findOne({ CID });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the Users array
    const result = await db.collection('Companies').updateOne(
      { CID },
      { $push: { Users: { UID, Password: hashedPassword, Role: '', Settings: { Language: '', Timezone: '' } } } }
    );

    if (result.modifiedCount === 1) {
      res.status(201).json({ message: 'User inserted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to insert user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

// Check environment variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file.');
  process.exit(1);
}

// MongoDB Atlas Setup
const mongoURI = process.env.MONGO_URI;
const clientDB = new MongoClient(mongoURI);

clientDB.connect()
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  });

// Express Setup
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Root route to check server status
app.get('/', (req, res) => {
  res.send('Server is running! Use /api/search for search functionality.');
});

// Express API endpoint to search for questions
app.post('/api/search', async (req, res) => {
  const { query, type, page = 1, pageSize = 10 } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const database = clientDB.db();
    const collection = database.collection('questions');

    // Build the MongoDB aggregation pipeline
    const agg = [
      {
        $search: {
          index: "standard",
          text: {
            query,
            path: 'title', // Change as per your collection structure
          },
        },
      },
      ...(type ? [{ $match: { type: type } }] : []),
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ];

    // Fetch results from MongoDB
    const results = await collection.aggregate(agg).toArray();

    // Total count for pagination
    const totalCountAgg = [
      {
        $search: {
          index: "standard",
          text: {
            query,
            path: 'title',
          },
        },
      },
      ...(type ? [{ $match: { type: type } }] : []),
      { $count: 'totalCount' },
    ];
    const totalCountResults = await collection.aggregate(totalCountAgg).toArray();
    const totalCount = totalCountResults[0]?.totalCount || 0;

    res.json({ questions: results, totalCount });
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ error: 'Error fetching search results' });
  }
});

// Start the Express server
const EXPRESS_PORT = process.env.PORT || 4000;
app.listen(EXPRESS_PORT, () => {
  console.log(`Express server running on port ${EXPRESS_PORT}`);
});


const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const mongoDbUri = "mongodb+srv://prabhasvarma017:Bahubali17@cluster1.ii0jfoc.mongodb.net/";

const client = new MongoClient(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get('/', async (req, res) => {
  try {
    await client.connect();
    res.json({ message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to connect to the database' });
  } finally {
    await client.close();
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;

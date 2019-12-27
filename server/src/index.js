import express from 'express';
import moment from 'moment';
import path from 'path';
import uuid from 'uuid/v4';

const app = express();

app.use(express.json());

// [{
//   id,
//   cipher,
//   expiration
// }]
let db = [];

app.get('/api/post/:postId', (req, res) => {
  const { postId } = req.params;

  // Time to compare expiration against
  const requestTime = moment().unix();

  // Find entry based on postId
  const entry = db.find(({ expiration, id }) => {
    // Ignore any expired entries
    if (expiration > 0 && expiration < requestTime) {
      return false;
    }

    return id === postId;
  });

  // No entry found
  if (!entry || !entry.cipher) {
    return res.json({ success: false });
  }

  // Remove expired entries from DB
  db = db.filter(({ expiration, id }) => {
    // Single-access expiration
    if (expiration === 0 && postId === id) {
      return false;
    }

    // Check if expiration is in the future
    if (expiration > 0) {
      return expiration > requestTime;
    }

    return expiration === 0;
  });

  return res.json({
    status: 0,
    cipher: entry.cipher
  });
});

app.post('/api/post', (req, res) => {
  // Extract data from request
  const { cipher, expiration } = req.body;

  // Generate unique ID
  const id = uuid();

  // Add new entry to "db"
  db.push({
    id,
    cipher,
    expiration
  });

  // Return new ID
  return res.json({
    id
  });
});

let PORT = 5000;

if (process.env.NODE_ENV === 'production') {
  PORT = 3000;
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
  });
}

app.listen(PORT, () => console.log('Server is up'));

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Route 1: Shorten a URL
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Please provide a URL' });
  }

  const shortCode = nanoid(6); // generates a random 6-character code

  try {
    await pool.query(
      'INSERT INTO urls (long_url, short_code) VALUES (?, ?)',
      [longUrl, shortCode]
    );
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;
    res.json({ shortUrl: `http://localhost:${process.env.PORT}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route 2: Redirect from short code to original URL
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT long_url FROM urls WHERE short_code = ?',
      [shortCode]
    );

    if (rows.length === 0) {
      return res.status(404).send('Short URL not found');
    }

    res.redirect(rows[0].long_url);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
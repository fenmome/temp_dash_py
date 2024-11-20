import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'temperature_db'
});

app.get('/api/temperature/latest', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT temperature FROM temperature_readings ORDER BY timestamp DESC LIMIT 1');
    const latestReading = rows[0];
    
    if (!latestReading) {
      return res.status(404).json({ error: 'No temperature readings found' });
    }
    
    res.json({ temperature: latestReading.temperature });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
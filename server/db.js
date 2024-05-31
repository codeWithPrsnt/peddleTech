const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432, 
});

async function createDatabase() {
    const client = await pool.connect();
    try {
      await client.query('CREATE DATABASE my_database');
      console.log('Database created successfully.');
    } catch (error) {
      console.error('Error creating database:', error);
    } finally {

      client.release();
    }
  }

 

  /* createDatabase().then(() => {

   }); */

module.exports = {
  query: (text, params) => pool.query(text, params),
};
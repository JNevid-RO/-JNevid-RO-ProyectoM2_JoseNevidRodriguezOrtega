const pool = require('../src/db');
const fs = require('fs');
const path = require('path');

const initDB = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');
    await pool.query(sql);
    console.log('Database inicializada');
    process.exit(0);
  } catch (error) {
    console.error('Iniciacion fallida:', error.message);
    process.exit(1);
  }
};
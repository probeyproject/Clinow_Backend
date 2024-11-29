import mysql from "mysql2/promise"

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
db.getConnection((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Database connected successfully.');
    }
  });
  
export default db;
  

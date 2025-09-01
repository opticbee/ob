// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",      // change if needed
  user: "root",           // your MySQL username
  password: "",           // your MySQL password
  database: "opticbee_db" // make sure this DB exists
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

module.exports = db;

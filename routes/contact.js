// contact.js
const express = require("express");
const db = require("./db");

const router = express.Router();

// Create contacts table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    company VARCHAR(150),
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    interests VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error("❌ Error creating contacts table:", err);
  } else {
    console.log("✅ Contacts table is ready");
  }
});

// POST /api/contact → Save contact form
router.post("/contact", (req, res) => {
  const { firstName, lastName, company, email, phone, interest, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Convert interests (array) to comma separated string
  const interests = Array.isArray(interest) ? interest.join(", ") : interest;

  const query = `
    INSERT INTO contacts (firstName, lastName, company, email, phone, interests, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [firstName, lastName, company, email, phone, interests, message];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting contact:", err);
      return res.status(500).json({ error: "Failed to save contact" });
    }
    res.status(201).json({ success: true, id: result.insertId });
  });
});

module.exports = router;

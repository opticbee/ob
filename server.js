// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import contact routes
const contactRoutes = require("./contact");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

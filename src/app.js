const express = require("express");
const cors = require("cors");

// initialize app
const app = express();

// Importing routes
const productRoutes = require("./routes/products");

// middleware
app.use(cors());
app.use(express.json());
app.use(productRoutes); // Note: Make sure to place this line below all other app.use() methods.

// Message
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

// Start server
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

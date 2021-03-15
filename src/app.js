const express = require("express");
const cors = require("cors");

// initialize app
const app = express();

// Importing routes
const productRoutes = require("./routes/products");

// Importing database
const db = require("./db/models");

// middleware
app.use(cors());
app.use(express.json());
app.use("/products", productRoutes); // Note: Make sure to place this line below all other app.use() methods.

// Message
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

// Start server
const run = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Server connected to database successfully.");

    app.listen(8000, () => {
      console.log("Server up and running on port 8000.");
      console.log("You can connect using http://localhost:8000");
    });
  } catch (error) {
    console.log("Failed to connect to database:", error);
  }
};

run();

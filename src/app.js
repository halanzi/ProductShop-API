const express = require("express");

// "components"
const products = require("./data");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

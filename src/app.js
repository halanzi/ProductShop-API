const express = require("express");
const cors = require("cors");

// data
let products = require("./data");

// initialise app
const app = express();

// middleware
app.use(cors());

// Logic writing
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// start server
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

const express = require("express");
const cors = require("cors");

// Slug
const slugify = require("slugify");

// Data
let products = require("./data");

// initialize app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

// Deleting Products
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

// Adding Products
app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Updating Products

// start server
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

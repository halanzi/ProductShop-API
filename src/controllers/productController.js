// Slug
const slugify = require("slugify");

// Data
let products = require("../data.js");

// Create product
exports.productCreate = (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Product list
exports.productList = (req, res) => res.json(products);

// Update product
exports.productUpdate = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    for (const key in req.body) foundProduct[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Delete product
exports.productDelete = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

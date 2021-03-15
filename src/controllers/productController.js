// Slug
const slugify = require("slugify");

// Data
let products = require("../data.js");

// Databse
const { Product } = require("../db/models");

// Create product
exports.productCreate = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Product list
exports.productList = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product (check later if works)
exports.productUpdate = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
exports.productDelete = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

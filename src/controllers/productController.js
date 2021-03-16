// Slug
const slugify = require("slugify");

// Data
let products = require("../data.js");

// Databse
const { Product } = require("../db/models");

// Fetch product
exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

// Product list
exports.productList = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Create product
exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// Update product
exports.productUpdate = async (req, res, next) => {
  try {
    await req.product.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete product
exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

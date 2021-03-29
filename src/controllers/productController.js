// Slug
const slugify = require("slugify");

// Databse
const { Product, Shop } = require("../db/models");

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
exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["id"],
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Update product
exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
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

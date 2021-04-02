// Slug
const slugify = require("slugify");

// Databse
const { Shop, Product } = require("../db/models");

// Fetch shop
exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

// Shop list
exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Product,
        as: "products",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

// Create shop
exports.shopCreate = async (req, res, next) => {
  try {
    const foundShop = await Shop.findOne({
      where: { userId: req.user.id },
    });
    if (foundShop) {
      const err = new Error("You already have a shop");
      err.status = 400;
      next(err);
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id; // relation stuff
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (err) {
    next(err);
  }
};

// Update shop
exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.shop.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete shop
exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// **** Product ****

// Create product
exports.productCreate = async (req, res, next) => {
  if (req.user.id === req.shop.userId) {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

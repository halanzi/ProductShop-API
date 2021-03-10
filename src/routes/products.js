const express = require("express");
const router = express.Router();

// controllers
const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

// Product list
router.get("/", productList);

// Adding Products
router.post("/", productCreate);

// Deleting Products
router.delete("/:productId", productDelete);

// Updating Products
router.put("/:productId", productUpdate);

module.exports = router;

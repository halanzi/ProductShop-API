const express = require("express");
const router = express.Router();

// importing
const upload = require("../middleware/multer");

// controllers
const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
  fetchProduct,
} = require("../controllers/productController");

// Param Middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

// Product list
router.get("/", productList);

// Adding Products
router.post("/", upload.single("image"), productCreate);

// Deleting Products
router.delete("/:productId", productDelete);

// Updating Products
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;

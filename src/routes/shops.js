// Dependancies
const express = require("express");
const router = express.Router();
const passport = require("passport");

// importing
const upload = require("../middleware/multer");

// controllers
const {
  shopCreate,
  shopList,
  shopUpdate,
  shopDelete,
  fetchShop,
  productCreate,
} = require("../controllers/shopController");

// Param Middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
    err.status = 404;
    next(err);
  }
});

// Shop list
router.get("/", shopList);

// Adding Shops
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

// Adding Products to shop
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

// Deleting Shops
router.delete("/:shopId", shopDelete);

// Updating Shops
router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;

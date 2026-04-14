const express = require("express");
const { createProduct, editProduct, deleteProduct } = require("../controllers/product_controller");
const { verifyUser } = require("../middleware/middleware");
const { asyncWrap } = require("../utils/async_wrap");
const router = express.Router();


router.post("/create", verifyUser, asyncWrap(createProduct));
router.put("/:id", verifyUser, asyncWrap(editProduct));
router.delete("/:id", verifyUser, asyncWrap(deleteProduct));

module.exports = router;

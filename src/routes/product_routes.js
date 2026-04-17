const express = require("express");
const { createProduct, editProduct, deleteProduct, renderHomePage, renderCreateProductPage, renderProductDetail, checkOut, renderEditPage } = require("../controllers/product_controller");
const { verifyUser } = require("../middleware/middleware");
const { asyncWrap } = require("../utils/async_wrap");
const router = express.Router();

router.get("/", verifyUser, asyncWrap(renderHomePage));

router.get("/new", verifyUser, asyncWrap(renderCreateProductPage));

router.get("/:id", verifyUser, asyncWrap(renderProductDetail));

router.post("/create", verifyUser, asyncWrap(createProduct));

router.get("/edit/:id", verifyUser, asyncWrap(renderEditPage));

router.put("edit/:id", verifyUser, asyncWrap(editProduct));

router.delete("/:id", verifyUser, asyncWrap(deleteProduct));



module.exports = router;





















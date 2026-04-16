const express = require("express");
const { verifyUser } = require("../middleware/middleware");
const { addToCart, getAllCarts, updateCartItem, removeItem, renderCartScreen } = require("../controllers/cart_controller");
const { asyncWrap } = require("../utils/async_wrap");
const router = express.Router();


router.post("/add", verifyUser, asyncWrap(addToCart));



router.get("/", verifyUser, asyncWrap(getAllCarts));

router.patch("/item/:id", verifyUser, asyncWrap(updateCartItem));

router.delete("/item/:id", verifyUser, asyncWrap(removeItem));





module.exports = router;















